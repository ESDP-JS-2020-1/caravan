const express = require('express');

const Statistics = require('../models/Statistic'),
    Product = require('../models/Product'),
    User = require('../models/User'),
    Request = require('../models/Request');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/product/:id/:date', isAuth, async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Request.find({
            products: {$elemMatch: { product: id }},
            date: {$gte: new Date(new Date() - req.params.date * 60 * 60 * 24 * 1000)},
            status: 'closed'
        }).select({ products: 1, date: 1 });

        const statistic = data.map((elem, index) => {
            const product = elem.products.filter(product => product.product.toString() === id.toString() )[0];
            const date = data[index].date;
            return { product, date }
        }).flat();

        const product = await Product.findOne({_id: req.params.id});

        res.send({statistic, product})
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/user/:id/:date', isAuth, async (req, res) => {
    try {
        const statistic = await Statistics.find({
            user: req.params.id,
            date: {$gte: new Date(new Date() - req.params.date * 60 * 60 * 24 * 1000)}
        }).populate(['user', 'product']);

        const user = await User.findOne({_id: req.params.id});

        res.send({user, statistic})
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;