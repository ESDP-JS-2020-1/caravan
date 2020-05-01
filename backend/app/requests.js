const express = require('express');

const Request = require('../models/Request');
const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/:id', auth, async (req, res) => {
	try {
		const requests = await Request.findOne({_id: req.params.id}).populate('user');

		return res.send(requests);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get('/', auth, async (req, res) => {
    try {
        if (req.currentUser.role === 'market') {
            const requests = await Request.find({user: req.currentUser._id}).populate('user');

            return res.send(requests);
        }
        const requests = await Request.find().populate('user');

        return res.send(requests);
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/:id', auth, async (req, res) => {
    try {

        const requests = await Request.find({_id: req.params.id});
        if (!requests){
        	return res.status(404).send({message:'Not found'})
		}
        return res.send(requests);


    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', [auth, permit('market')], async (req, res) => {
	try {
		const requests = {
			user: req.currentUser,
			products: req.body.products,
			comment: req.body.comment
		};

		console.log(requests);

		await Request.create(requests);


        return res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;

