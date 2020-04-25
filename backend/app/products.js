const express = require('express');

const Product = require('../models/Product');

const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/', [auth, permit('admin')], async (req, res) => {
    const product = new Product({products: req.body});

    try {
        await product.save();
        return res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;