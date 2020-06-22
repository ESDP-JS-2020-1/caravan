const express = require('express');

const
    Request = require('../models/Request'),
    permissions = require('../permissions'),
    permit = require('../middleware/permit'),
    isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/product/:id', isAuth, permit(permissions.GET_STATISTIC), async (req, res) => {
    try {
        const id = req.params.id;
        const {from, to} = req.query

        const data = await Request.find({
            products: {$elemMatch: {product: id}},
            date: {"$gte": new Date(from), "$lt": new Date(to)},
            status: 'closed'
        }).select({products: 1, date: 1});

        const statistic = data.map((elem, index) => {
            const product = elem.products.filter(product => product.product.toString() === id.toString())[0];
            const date = data[index].date;
            return {...product._doc, date}
        }).flat();

        res.send(statistic)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/user/:id', isAuth, permit(permissions.GET_STATISTIC), async (req, res) => {
    try {

        const createRelevantData = (array) => {
            const data = []
            array.forEach(element => {
                element.products.forEach(product => data.push({...product._doc, date: element.date}))
            })
            return (data)
        }

        const id = req.params.id;
        const {from, to} = req.query

        const data = await Request.find({
            user: id,
            date: {"$gte": new Date(from), "$lt": new Date(to)}
        }).select({products: 1, date: 1});

        const statistic = createRelevantData(data);

        res.send(statistic)
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;