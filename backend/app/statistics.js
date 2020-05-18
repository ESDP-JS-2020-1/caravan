const express = require('express');

const Statistics = require('../models/Statistic');

const router = express.Router();

router.get('/:id/:date', async (req, res) => {
    try {
        const statistic = await Statistics.find({
            product: req.params.id,
            date: {$gte: new Date(new Date() - req.params.date * 60 * 60 * 24 * 1000)}
        }).populate(['user', 'product']);
        res.send(statistic)
    } catch (e) {
        res.status(404).send(e)
    }
});

module.exports = router;