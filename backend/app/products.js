const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const Product = require('../models/Product');
const History = require('../models/History');

const config = require('../config');
const auth = require('../middleware/isAuth');
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

router.post('/', [auth, permit('admin'), upload.single('image')], async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename
        }
        const products = req.body;

        await Product.create(products);

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