const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const config = require('../config');
const User = require('../models/User');
const isAuth = require('../middleware/isAuth')
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.userAvatar)
    },
    filename: (req, file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.post('/', isAuth, upload.single('avatar'), async (req, res) => {
    if(req.file){
        req.body.avatar = req.file.filename
    }

    const newUser = new User(req.body);

    try {
        newUser.addToken();
        await newUser.save();

        res.send(newUser)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.post('/sessions', async (req, res) => {
    req.user.addToken();
    req.user.save();

    res.send(req.user)
});

router.delete('/sessions', isAuth, async (req, res) => {
    const success = {message: "success"};
    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.addToken();
        await user.save();

        return res.send(success);

    } catch (e) {
        res.send(success)
    }

});

module.exports = router;