const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const Product = require('../models/Product');
const config = require('../config');
const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.userAvatar)
    },
    filename: (req, file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});


router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.find();

        return res.send(products);
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/:id', auth, async (req, res) => {

    try {
        const product = await Product.findOne({_id: req.params.id});
        console.log(product);
        res.send(product)
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
router.put('/:id', auth, permit('admin'), upload.single('image'), async (req, res) => {
    const product = req.body;
    try {
        const whiteList = {
            name: product.name,
            amount: product.amount,
            price: product.price
        };
        const productOne = await Product.findOne({_id: req.params.id});
        if (!productOne) {
            return res.status(404).send({message: 'Product not found'})
        }
        if (req.file) {
            whiteList.image = req.file.filename
        }

        const updateProduct = await Product.findOneAndUpdate({_id: req.params.id}, {$set: whiteList}, {returnNewDocument: true});

        console.log(updateProduct);

        return res.send(updateProduct);
    } catch (e) {
        res.status(500).send(e)
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id});
        if (!product) {
            return res.status(404).send({message: 'Product not found'})
        }
        await Product.deleteOne({_id: req.params.id});
        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;