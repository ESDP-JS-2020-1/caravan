const express = require('express');

const Product = require('../models/Product');

const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.find();

        return res.send(products);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', [auth, permit('admin')], async (req, res) => {
    try {
        const products = req.body;

        await Product.insertMany(products);

        return res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;