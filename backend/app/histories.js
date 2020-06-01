const express = require('express');

const History = require('../models/History');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', isAuth, permit('viewHistory'), async (req, res) => {
    try {
        const histories = await History.find().sort({date: -1}).populate('user');
        res.send(histories)
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;