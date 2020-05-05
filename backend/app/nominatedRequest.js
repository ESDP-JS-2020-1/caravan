const express = require('express');

const NominatedRequest = require('../models/NominatedRequest');
const Request = require('../models/Request');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/', isAuth, permit('admin', 'operator'), async (req, res) => {
    const whiteList = {
        courier: req.body.courier,
        request: req.body.request
    };

    await Request.updateOne({_id: whiteList.request}, {status: 'performed'});

    const NewNominatedRequest = await NominatedRequest.create(whiteList);

    res.send(NewNominatedRequest);
});

router.delete('/:id', isAuth, permit('admin', 'operator'), async (req, res) => {
    await NominatedRequest.deleteOne({request: req.params.id});

    await Request.updateOne({_id: req.params.id}, {status: 'pending'});

    res.send({message: 'Deleted!'});
});

module.exports = router;