const express = require('express');

const History = require('../models/History');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/:page/:limit', isAuth, permit('viewHistory'), async (req, res) => {
    try {
        const historyLength = await History.find();
        const aggregateQuery = History.aggregate();

        const pageAmount = Math.ceil(historyLength.length / req.params.limit);

        let page = req.params.page;
            page = pageAmount - (page - 1)

        const history = await History.aggregatePaginate(aggregateQuery, {
            page: page,
            limit: req.params.limit
        });

        await history.docs.reverse();

        res.send(history)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
});

module.exports = router;