const express = require('express');

const History = require('../models/History');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const permissions = require('../permissions')

const router = express.Router();

router.get('/:page/:limit', isAuth, permit(permissions.VIEW_HISTORY), async (req, res) => {
    try {
        const aggregateQuery = History.aggregate();

        let page = req.params.page;

        const history = await History.aggregatePaginate(aggregateQuery, {
            page: page,
            limit: req.params.limit
        });

        await history.docs.reverse();

        res.send(history)
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;