const express = require('express');

const Product = require('../models/Product');

const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/', [auth, permit('admin')], async (req, res) => {
    try {
        const products = req.body;

        await Promise.all(products.map(async (product, index) => {
            if(!products[index].name || !products[index].amount || !products[index].price) {
                return res.status(404).send({message: 'All fields must be filled'})
            }

            await Product.create({
                name: products[index].name,
                amount: products[index].amount,
                price: products[index].price,
            });
        }))

        return res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;