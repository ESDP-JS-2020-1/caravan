const express = require('express');

const Statistics = require('../models/Statistic'),
      Product = require('../models/Product');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/:id/:date', isAuth, async (req, res) => {
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

module.exports = router;