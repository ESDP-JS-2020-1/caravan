const express = require('express');
const auth = require('../middleware/isAuth');
const Product = require('../models/Product');
const upload = require('../multer');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.find({ isRemoved: false });

        return res.send(products);
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/:id', auth, async (req, res) => {

    try {
        const product = await Product.findOne({_id: req.params.id});
        res.send(product)
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', [auth, permit('addProduct'), upload.single('image')], async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename
        }

        const products = req.body;

        await Product.insertMany(products);

        return res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', auth, permit('editProduct'), upload.single('file'), async (req, res) => {
    try {
        const product = req.body;

        const productOne = await Product.findOne({_id: req.params.id});

        if (req.file) product.image = req.file.filename;

        productOne.name = product.name;
        productOne.amount = product.amount;
        productOne.price = product.price;
        productOne.isRefrigeratorRequired = product.isRefrigeratorRequired;
        productOne.image = product.image;

        productOne.save(req);
        return res.send(productOne);
    } catch (e) {
        res.status(404).send(e)
    }
});

router.delete('/:id', auth, permit('deleteProduct'), async (req, res) => {
    try {
        const productOne = await Product.findOne({_id: req.params.id});

        if (!productOne) {
            return res.status(404).send({message: 'Product not found'})
        }

        productOne.isRemoved = true;
        productOne.save(req);

        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});


module.exports = router;