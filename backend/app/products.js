const express = require('express');

const Product = require('../models/Product');

const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/', [auth, permit('admin')], async (req, res) => {
    try {
        const products = req.body;

        for(let i = 0; i < products.length; i++) {
            if(!products[i].name || !products[i].amount || !products[i].price) {
                return res.status(404).send({message: 'All fields must be filled'})
            }

            await Product.create({
                name: products[i].name,
                amount: products[i].amount,
                price: products[i].price,
            });
        }

        return res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;