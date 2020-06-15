const express = require('express');
const auth = require('../middleware/isAuth');
const Product = require('../models/Product');
const upload = require('../multer');
const permit = require('../middleware/permit');

const permissions = require('../permissions');

const router = express.Router();

router.get('/removed', auth, permit(permissions.GET_TRASH), async (req, res) => {
    try {
        const removed = await Product.find({ isRemoved: true });

        res.send(removed);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.find({isRemoved: false});

        if (!products) {
            return res.status(404).send({message: 'Products are not found!'});
        }

        return res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});
router.get('/:id', auth, async (req, res) => {

    try {
        const product = await Product.findOne({_id: req.params.id});

        if (!product) {
            return res.status(404).send({message: 'Product not found!'});
        }

        res.send(product)
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', [auth, permit(permissions.ADD_PRODUCT), upload.single('image')], async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename
        }

        const products = req.body;

        const product = new Product(products)
        product.save(req)

        return res.send({message: 'success'});
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/:id', auth, permit(permissions.EDIT_PRODUCT), upload.single('file'), async (req, res) => {
    try {
        const product = req.body;

        const productOne = await Product.findOne({_id: req.params.id});

        if (req.file) product.image = req.file.filename;

        productOne.name = product.name;
        if (product.addProduct) productOne.amount = parseInt(productOne.amount) + parseInt(product.addProduct);
        productOne.price = product.price;
        productOne.isRefrigeratorRequired = product.isRefrigeratorRequired;
        productOne.image = product.image;

        productOne.save(req);
        return res.send(productOne);
    } catch (e) {
        res.status(500).send(e)
    }
});

router.delete('/:id', auth, permit(permissions.DELETE_PRODUCT), async (req, res) => {
    try {
        const productOne = await Product.findOne({_id: req.params.id});

        if (!productOne) {
            return res.status(404).send({message: 'Product not found'})
        }

        productOne.isRemoved = true;
        productOne.date = Date.now()
        productOne.save(req);

        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});


module.exports = router;