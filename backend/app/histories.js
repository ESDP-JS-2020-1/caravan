const express = require('express');

const History = require('../models/History');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await History.find();
    res.send(products)
});

module.exports = router;