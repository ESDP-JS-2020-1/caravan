const express = require('express');

const
    Product = require('../models/Product'),
    User = require('../models/User'),
    Request = require('../models/Request');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/product/:id/:date', isAuth, async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Request.find({
            products: {$elemMatch: {product: id}},
            date: {$gte: new Date(new Date() - req.params.date * 60 * 60 * 24 * 1000)},
            status: 'closed'
        }).select({products: 1, date: 1});

        const statistic = data.map((elem, index) => {
            const product = elem.products.filter(product => product.product.toString() === id.toString())[0];
            const date = data[index].date;
            return {product, date}
        }).flat();

        const product = await Product.findOne({_id: req.params.id});

        res.send({statistic, product})
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/user/:id/:date', isAuth, async (req, res) => {
    try {

        const createRelevantData = (array) => {
            const data = []
            array.forEach(element => {
                element.products.forEach(product => data.push({...product._doc, date: element.date}))
            })
            return (data)
        }

        const id = req.params.id;

        const data = await Request.find({
            user: id,
            date: {$gte: new Date(new Date() - req.params.date * 60 * 60 * 24 * 1000)}
        }).select({products: 1, date: 1});

        const statistic = createRelevantData(data);

        const user = await User.findOne({_id: req.params.id});

        res.send({user, statistic})
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;