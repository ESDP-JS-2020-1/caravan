const express = require('express');
const History = require('../models/History');
const Request = require('../models/Request');
const User = require('../models/User');
const Product = require('../models/Product');
const NominatedRequest = require('../models/NominatedRequest');
const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/close/:id', [auth, permit('operator', 'admin', 'courier')], async (req, res) => {
    try {
        await Request.updateOne({_id: req.params.id}, {status: 'closed'});

        return res.send({message: 'Closed!'});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const request = await Request.findOne({_id: req.params.id}).populate('user');
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

            const requests = await Request.find({user: req.currentUser._id}).populate('user');
            return res.send(requests);
        } else if (req.currentUser.role === 'courier') {

            const requests = await NominatedRequest.find({courier: req.currentUser._id})
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
        const requests = await Request.find().populate('user');

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

router.post('/', [auth, permit('market', 'admin')], async (req, res) => {
    try {
        for(let i = 0; i < req.body.products.length; i++){
            const product = await Product.findOne({name: req.body.products[i].name});
            req.body.products[i].isRefrigeratorRequired = product.isRefrigeratorRequired;
        }

        const requests = {
            user: req.currentUser,
            products: req.body.products,
            comment: req.body.comment
        };

        await Request.create(requests);


        return res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const request = req.body;

        const requestOne = await Request.findOne({_id: req.params.id}).populate('user');

        if (!requestOne) return res.status(404).send({message: 'Not found'});

        let historyData = {title: req.currentUser.displayName + ' отредактировал заявку ' + requestOne.user.displayName, type: 'edit'};

        if (requestOne.comment) historyData.comment = requestOne.comment;

        await History.create(historyData);

        requestOne.user = request.user;
        requestOne.products = request.products;
        requestOne.comment = request.comment;

        requestOne.save();

        return res.send(requestOne)
    } catch (e) {
        res.status(500).send(e)
    }


});

router.delete('/:id', [auth, permit('admin', 'operator')], async (req, res) => {

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

        await Request.deleteOne({_id: req.params.id});
        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;

