const express = require('express');

const NominatedRequest = require('../models/NominatedRequest');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/', isAuth, permit('admin', 'operator'), async (req, res) => {
    const whiteList = {
        courier: req.body.courier,
        request: req.body.request
    };
    const NewNominatedRequest = await NominatedRequest.create(whiteList);

    res.send(NewNominatedRequest);
});

module.exports = router;