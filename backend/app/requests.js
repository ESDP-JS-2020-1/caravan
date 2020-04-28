const express = require('express');

const Request = require('../models/Request');
const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/', [auth, permit('market')], async (req, res) => {
	try {
		const requests = req.body;

		requests.forEach(elem => {
			elem.user = req.currentUser;
		});

		await Request.insertMany(requests);

		return res.send({message: 'success'});
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;

