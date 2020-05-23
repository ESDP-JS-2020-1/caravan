const express = require('express');
const History = require('../models/History');
const Request = require('../models/Request');
const User = require('../models/User');
const Product = require('../models/Product');
const NominatedRequest = require('../models/NominatedRequest');
const Statistic = require('../models/Statistic');

const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/close/:id', [auth, permit('closeRequest')], async (req, res) => {
    try {
        const request = await Request.findOne({_id: req.params.id});

        if (request.status === 'performed') {
            request.status = 'closed'
        } else return res.status(404).send({message: 'Request status is not performed!'});

        const statData = request.products.map(async elem => await Statistic.create({
            user: request.user._id,
            product: elem.product,
            amount: elem.amount
        }));

        await Promise.all(statData);

        await request.save();

        return res.send({message: 'Closed!'});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const request = await Request.findOne({_id: req.params.id})
            .populate(['user', 'products.product']);

        const courierList = await User.find({role: 'courier'});

        const isNominated = await NominatedRequest.findOne({request: req.params.id}).populate('courier');

        const data = {request, courierList, isNominated: !!isNominated};

        if (!!isNominated) data.nominatedCourier = isNominated.courier;

        return res.send(data);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        if (req.currentUser.role === 'market') {

            const requests = await Request.find({user: req.currentUser._id})
                .sort({date: -1})
                .populate('user');

            return res.send(requests);
        } else if (req.currentUser.role === 'courier') {

            const requests = await NominatedRequest.find({courier: req.currentUser._id})
                .sort({date: -1})
                .select({courier: 0})
                .populate({
                    path: 'request',
                    select: 'date',
                    populate: {
                        path: 'user',
                        select: 'displayName'
                    }
                });

            return res.send(requests);
        }
        const requests = await Request.find()
            .sort({date: -1})
            .populate('user');

        return res.send(requests);
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/:id', auth, async (req, res) => {
    try {

        const requests = await Request.find({_id: req.params.id});
        if (!requests) {
            return res.status(404).send({message: 'Not found'})
        }
        return res.send(requests);


    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', [auth, permit('addRequest')], async (req, res) => {
    try {
        const request = req.body;
        request.products = request.products.map(elem => ({
                product: elem.product,
                amount: elem.amount
            }
        ))

        for (let i = 0; i < request.products.length; i++) {
            const product = await Product.findOne({_id: request.products[i].product});

            if (product.amount < request.products[i].amount) return res.status(400).send({error: `One of products in request has more products than is in stock!`});
        }

        const successfulRequest = await Request.create({
            user: req.currentUser,
            comment: request.comment,
            products: request.products
        });

        for (let i = 0; i < request.products.length; i++) {
            const product = await Product.findOne({_id: request.products[i].product});

            product.amount = product.amount - request.products[i].amount

            await product.save();
        }

        return res.send(successfulRequest);
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.put('/:id', [auth, permit('editRequest')], async (req, res) => {
    try {
        const request = req.body;

        const requestOne = await Request.findOne({_id: req.params.id}).populate('user');

        if(requestOne.status === 'closed') return res.status(400).send({error: 'This request is closed, you cant edit this request!'})

        if (!requestOne) return res.status(404).send({message: 'Not found'});

        let historyData = {
            title: req.currentUser.displayName + ' отредактировал заявку ' + requestOne.user.displayName,
            type: 'edit'
        };

        if (requestOne.comment) historyData.comment = requestOne.comment;

        await History.create(historyData);

        for (let i = 0; i < requestOne.products.length; i++) {
            const product = await Product.findOne({_id: requestOne.products[i].product});

            if(requestOne.products[i].amount !== request.products[i].amount){
                product.amount = parseInt(product.amount) - parseInt(request.products[i].amount) + parseInt(requestOne.products[i].amount)

                if (product.amount < 0) return res.status(400).send({error: `One of products in request has more products than is in stock!`});

                await product.save();
            }
        }

        requestOne.user = request.user;
        requestOne.products = request.products;
        requestOne.comment = request.comment;

        requestOne.save();

        return res.send(requestOne)
    } catch (e) {
        res.status(500).send(e)
    }


});

router.delete('/:id', [auth, permit('deleteRequest')], async (req, res) => {

    try {
        const requestOne = await Request.findOne({_id: req.params.id});

        if (!requestOne) {
            return res.status(404).send({message: 'Request not found'})
        }

        let historyData = {title: req.currentUser.displayName + ' удалил заявку ' + requestOne._id, type: 'delete'};

        if (requestOne.comment) {
            historyData.comment = requestOne.comment
        }
        const history = new History(historyData);
        await history.save();

        for (let i = 0; i < requestOne.products.length; i++) {
            const product = await Product.findOne({_id: requestOne.products[i].product});

            product.amount = parseInt(product.amount) + parseInt(requestOne.products[i].amount)

            await product.save();
        }

        await Request.deleteOne({_id: req.params.id});

        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;

