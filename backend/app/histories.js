const express = require('express');

const History = require('../models/History');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', isAuth, permit('admin'), async (req, res) => {
    const products = await History.find().sort({date: -1});
    res.send(products)
});

module.exports = router;