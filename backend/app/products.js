const express = require('express');

const Product = require('../models/Product');
const History = require('../models/History');

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

        const history = new History({
            title: req.currentUser.displayName + ' добавил продукт ' + products.name,
            comment: req.body.comment,
            type: req.body.type
        });
        await history.save();

        return res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;