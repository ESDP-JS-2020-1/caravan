const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const config = require('../config');
const User = require('../models/User');

const isAuth = require('../middleware/isAuth')
const permit = require('../middleware/permit');


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

router.post('/', isAuth, permit('admin'), upload.single('avatar'), async (req, res) => {
    const user = req.body;

    if(req.file){
        req.body.avatar = req.file.filename
    }

    const newUser = new User({
        username: user.username,
        password: user.password,
        displayName: user.displayName,
        role: user.role,
        avatar: user.avatar
    });

    try {
        newUser.addToken();
        await newUser.save();

        res.send(newUser)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.get('/', isAuth, async (req, res) => {
   try {
       const users = await User.find().select({token: 0});

       res.send(users)
   } catch (e) {
       res.status(500).send(e)
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