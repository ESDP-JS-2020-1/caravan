const express = require('express');

const NominatedRequest = require('../models/NominatedRequest');
const Request = require('../models/Request');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/', isAuth, permit('addRequest'), async (req, res) => {
    try {
        const whiteList = {
            courier: req.body.courier,
            request: req.body.request
        };

        const request = await Request.findOne({_id: whiteList.request});

        if(request.status === 'pending') {
            request.status = 'performed'
        } else return res.status(404).send({message: 'Request status is not pending!'});

        await request.save();

        const NewNominatedRequest = await NominatedRequest.create(whiteList);

        res.send(NewNominatedRequest);
    } catch (e) {
        res.status(404).send(e);
    }
});

router.delete('/:id', isAuth, permit('addRequest'), async (req, res) => {
    try {
        await NominatedRequest.deleteOne({request: req.params.id});

        const request = await Request.findOne({_id: req.params.id});

        request.status = 'pending';

        request.save();

        res.send({message: 'Deleted!'});
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;