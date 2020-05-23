const express = require('express');

const Statistics = require('../models/Statistic'),
      Product = require('../models/Product'),
      User = require('../models/User');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/product/:id/:date', isAuth, async (req, res) => {
    try {
        const statistic = await Statistics.find({
            product: req.params.id,
            date: {$gte: new Date(new Date() - req.params.date * 60 * 60 * 24 * 1000)}
        }).populate(['user', 'product']);

        const product = await Product.findOne({_id: req.params.id});

        res.send({product, statistic})
    } catch (e) {
        console.log(e);
        res.status(404).send(e)
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
        console.log(e);
        res.status(404).send(e)
    }
});

module.exports = router;