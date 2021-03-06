const express = require('express');

const NominatedRequest = require('../models/NominatedRequest');
const Request = require('../models/Request');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const permissions = require('../permissions')

const router = express.Router();

router.post('/', isAuth, permit(permissions.ADD_REQUEST), async (req, res) => {
    try {
        const whiteList = {
            courier: req.body.courier,
            request: req.body.request
        };

        const request = await Request.findOne({_id: whiteList.request});

        if (request.status === 'pending') {
            request.status = 'performed'
        } else return res.status(400).send({message: 'Request status is not pending!'});

        await request.save();

        const newNominatedRequest = await NominatedRequest.create(whiteList);

        res.send(newNominatedRequest);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/:id', isAuth, permit(permissions.ADD_REQUEST), async (req, res) => {
    try {
        await NominatedRequest.deleteOne({request: req.params.id});

        const request = await Request.findOne({_id: req.params.id});

        request.status = 'pending';

        request.save();

        res.send({message: 'Deleted!'});
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;