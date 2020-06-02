const express = require('express');

const History = require('../models/History');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/:page/:limit', isAuth, permit('viewHistory'), async (req, res) => {
    try {
        const historyLength = await History.find();
        const aggregateQuery = History.aggregate();

        const history = await History.aggregatePaginate(aggregateQuery, {
            page: req.params.page,
            limit: req.params.limit
        });

        const pageAmount = Math.ceil(historyLength.length / req.params.limit);

        res.send({history, pageAmount})
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;