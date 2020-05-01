const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const auth = require('../middleware/isAuth');
const Product = require('../models/Product');
const config = require('../config');
const History = require('../models/History');
const permit = require('../middleware/permit');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.productImage)
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
        res.send(product)
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', [auth, permit('admin'), upload.single('image')], async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename
        }

        const products = req.body;

        let historyData = {title: req.currentUser.displayName +' добавил продукт ' + products.name, type:'add'};

        if (products.comment){
            historyData.comment = products.comment
        }
        const history = new History(historyData);
        await history.save();

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
        let historyData = {title: req.currentUser.displayName +' Edit product ' + productOne.name, type:'edit'};

        if (product.comment){
            historyData.comment = product.comment
        }
        const history = new History(historyData);
        await history.save();

        const updateProduct = await Product.findOneAndUpdate({_id: req.params.id}, {$set: whiteList}, {returnNewDocument: true});

        return res.send(updateProduct);
    } catch (e) {
        res.status(500).send(e)
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    let product = req.body;
    try {
        const productOne = await Product.findOne({_id: req.params.id});
        if (!productOne) {
            return res.status(404).send({message: 'Product not found'})
        }

        let historyData = {title: req.currentUser.displayName +' удалил продукт ' + productOne.name, type:'delete'};

        if (product.comment){
            historyData.comment = product.comment
        }
        const history = new History(historyData);
        await history.save();

        await Product.deleteOne({_id: req.params.id});
        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});


module.exports = router;