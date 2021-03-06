const express = require('express');
const Request = require('../models/Request');
const User = require('../models/User');
const Product = require('../models/Product');
const NominatedRequest = require('../models/NominatedRequest');
const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const permissions = require('../permissions');

const router = express.Router();

router.get('/removed', [auth, permit(permissions.GET_TRASH)], async (req, res) => {
    try {
        const removed = await Request.find({isRemoved: true});

        res.send(removed);
    } catch (e) {
        res.status(500).send(e);
    }
});


router.post('/close/:id', [auth, permit(permissions.CLOSE_REQUEST)], async (req, res) => {
    try {
        const request = await Request.findOne({_id: req.params.id});

        if (request.status === 'performed') {
            request.status = 'closed'
        } else return res.status(400).send({message: 'Request status is not performed!'});

        await request.save();

        return res.send({message: 'Closed!'});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/:id', auth, permit(permissions.GET_REQUEST), async (req, res) => {
    try {
        const request = await Request.findOne({_id: req.params.id})
            .populate(['user', 'products.product']);

        const sumPrice = request.products.reduce((sum, num) => sum + (parseInt(num.product.price) * parseInt(num.amount)), 0);

        const courierList = await User.find({role: 'courier', isRemoved: false});

        const isNominated = await NominatedRequest.findOne({request: req.params.id}).populate({
            path: 'courier',
            match: { isRemoved: false}
        });

        const data = {request, courierList, isNominated: !!isNominated, sumPrice};

        if (!!isNominated) data.nominatedCourier = isNominated.courier;

        return res.send(data);
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/user_request/:id/:page/:limit', [auth, permit(permissions.GET_REQUEST)], async (req, res) => {

    try {
        let arr = {};

        const userRequest = await Request.find({
            user: req.params.id,
            status: 'closed'
        }).populate(['products.product', 'user'])

        console.log(userRequest.length);
        if (userRequest) {
            const userProduct = userRequest.flatMap((elem => (
                elem.products.map(elem2 => ({
                    amount: elem2.amount,
                    product: elem2.product,
                    date: elem.date,
                    user: elem.user
                })))));

            const indexEnd = req.params.page * req.params.limit;
            const indexStart = indexEnd - req.params.limit;
            arr.docs = userProduct.slice(indexStart, indexEnd);
            arr.totalPages = Math.ceil(userProduct.length / req.params.limit)
        }

        res.send(arr)
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/', auth, permit(permissions.GET_REQUEST), async (req, res) => {
    try {
        if (req.currentUser.role === 'market') {

            const requests = await Request.find({user: req.currentUser._id, isRemoved: false})
                .sort({date: -1})
                .populate('user');

            return res.send(requests);
        } else if (req.currentUser.role === 'courier') {

            const requests = await NominatedRequest.find({
                courier: req.currentUser._id,
                isRemoved: false
            })
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
        const requests = await Request.find({isRemoved: false})
            .sort({date: -1})
            .populate('user');

        return res.send(requests);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', [auth, permit(permissions.ADD_REQUEST)], async (req, res) => {
    try {
        const request = req.body;

        for (let i = 0; i < request.products.length; i++) {
            if (request.products[i].amount < 1) return res.status(400).send({error: 'Amount of product request is not valid'});
        }

        request.products = request.products.map(elem => ({
                product: elem.product,
                amount: elem.amount
            }
        ));

        const products = await Product.find({_id: {$in: request.products.map(p => (p.product))}});

        for (let i = 0; i < request.products.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (products[j]._id.toString() === request.products[i].product.toString()) {
                    if (products[j].amount < request.products[i].amount)
                        return res.status(400).send({error: `One of products in request has more products than is in stock!`});
                }
            }
        }

        const successfulRequest = new Request({
            user: req.currentUser,
            products: request.products
        });
        successfulRequest.save(req);

        for (let i = 0; i < request.products.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (products[j]._id.toString() === request.products[i].product.toString()) {
                    products[j].amount = products[j].amount - request.products[i].amount;
                    await products[j].save(req);
                }
            }
        }

        return res.send(successfulRequest);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', [auth, permit(permissions.EDIT_REQUEST)], async (req, res) => {
    try {
        const request = req.body;

        for (let i = 0; i < request.products.length; i++) {
            if (request.products[i].amount < 1) return res.status(400).send({response: {data: {error: 'Amount of product request is not valid'}}});
        }

        const requestOne = await Request.findOne({_id: req.params.id}).populate('user');

        if (requestOne.status === 'closed') return res.status(400).send({error: 'This request is closed, you cant edit this request!'});

        if (!requestOne) return res.status(404).send({message: 'Request not found'});

        const arrId = [...request.products, ...requestOne.products].map(p => p.product._id || p.product);

        const products = await Product.find({_id: {$in: arrId}});

        for (let i = 0; i < requestOne.products.length; i++) {
            for (let j = 0; j < products.length; j++) {

                if (products[j]._id.toString() === requestOne.products[i].product.toString()) {

                    products[j].amount = parseInt(products[j].amount) + parseInt(requestOne.products[i].amount);

                    await products[j].save();
                }
            }
        }

        for (let i = 0; i < request.products.length; i++) {
            for (let j = 0; j < products.length; j++) {

                if (request.products[i].product._id.toString() === products[j]._id.toString()) {

                    products[j].amount = parseInt(products[j].amount) - parseInt(request.products[i].amount);

                    if (products[j].amount < 0) {
                        return res.status(400).send({error: `One of products in request has more products than is in stock!`});
                    }

                    await products[j].save();
                }
            }
        }

        requestOne.user = request.user;
        requestOne.products = request.products;

        requestOne.save(req);

        return res.send(requestOne)
    } catch (e) {
        res.status(500).send(e)
    }


});

router.delete('/:id', [auth, permit(permissions.DELETE_REQUEST)], async (req, res) => {
    try {
        const requestOne = await Request.findOne({_id: req.params.id});
        if (!requestOne) {
            return res.status(404).send({message: 'Request not found'})
        }

        const products = await Product.find({_id: {$in: requestOne.products.map(p => (p.product))}});

        for (let i = 0; i < requestOne.products.length; i++) {
            for (let j = 0; j < products.length; j++) {

                if (products[j].id.toString() === requestOne.products[i].product.toString()) {

                    products[j].amount = parseInt(products[j].amount) + parseInt(requestOne.products[i].amount);

                    await products[j].save();
                }
            }
        }

        requestOne.isRemoved = true;
        requestOne.date = Date.now();
        requestOne.save(req);

        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});

router.delete('/close/:id', [auth, permit(permissions.DELETE_REQUEST)], async (req, res) => {
    try {
        const requestOne = await Request.findOne({_id: req.params.id});
        if (!requestOne) {
            return res.status(404).send({message: 'Request not found'})
        }

        requestOne.isRemoved = true;
        requestOne.date = Date.now();
        requestOne.save(req);

        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;

