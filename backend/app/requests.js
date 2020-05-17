const express = require('express');
const History = require('../models/History');
const Request = require('../models/Request');
const User = require('../models/User');
const NominatedRequest = require('../models/NominatedRequest');
const Statistic = require('../models/Statistic');

const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/close/:id', [auth, permit('closeRequest')], async (req, res) => {
    try {
        const request = await Request.findOne({_id: req.params.id});

        if(request.status === 'performed') {
            request.status = 'closed'
        } else return res.status(404).send({message: 'Request status is not performed!'});

        const statData = request.products.map(async elem => await Statistic.create({
            user: request.user._id,
            product: elem.product
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
            .populate(['user','products.product']);

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

        const successfulRequest = await Request.create({
            user: req.currentUser,
            comment: request.comment,
            products: request.products
        });

        return res.send(successfulRequest);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', [auth, permit('editRequest')], async (req, res) => {
    try {
        const request = req.body;

        const requestOne = await Request.findOne({_id: req.params.id}).populate('user');

        if (!requestOne) return res.status(404).send({message: 'Not found'});

        let historyData = {
            title: req.currentUser.displayName + ' отредактировал заявку ' + requestOne.user.displayName,
            type: 'edit'
        };

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

        await Request.deleteOne({_id: req.params.id});
        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;

