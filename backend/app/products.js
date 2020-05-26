const express = require('express');
const auth = require('../middleware/isAuth');
const Product = require('../models/Product');
const upload = require('../multer');
const History = require('../models/History');
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

router.put('/:id', auth, permit('editProduct'), upload.single('file'), async (req, res) => {
    try {
        const product = req.body;

        const productOne = await Product.findOne({_id: req.params.id});

        if (req.file) product.image = req.file.filename;

        let historyData = {title: req.currentUser.displayName +' Edit product ' + productOne.name, type:'edit'};

        if (product.comment) historyData.comment = product.comment;

        await History.create(historyData);

        productOne.name = product.name;
        productOne.amount = product.amount;
        productOne.price = product.price;
        productOne.isRefrigeratorRequired = product.isRefrigeratorRequired;
        productOne.image = product.image;

        productOne.save();
        return res.send(productOne);
    } catch (e) {
        res.status(404).send(e)
    }
});

router.delete('/:id', auth, permit('deleteProduct'), async (req, res) => {
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

        productOne.isRemoved = true;
        productOne.save(req);

        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});


module.exports = router;