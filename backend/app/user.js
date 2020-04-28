const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');
const path = require('path');

const config = require('../config');
const User = require('../models/User');
const History = require('../models/History');

const isAuth = require('../middleware/isAuth');
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

    if (req.file) {
        req.body.avatar = req.file.filename
    }

    const newUser = new User({
        username: user.username,
        password: user.password,
        displayName: user.displayName,
        role: user.role,
        avatar: user.avatar,
        address: user.address,
        companyName: user.companyName,
        phone: user.phone,
        carName: user.carName,
        carVolume: user.carVolume,
        carRefrigerator: user.carRefrigerator
    });

    const history = new History({
        title: req.currentUser.displayName + ' добавил пользователя ' + user.displayName,
        comment: req.body.comment,
        type: req.body.type
    });
    await history.save();

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
        if(req.query.role){
            const users = await User.find({role: req.query.role}).select({token: 0});

            return res.send(users)
        }
        const users = await User.find().select({token: 0});

        return res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const users = await User.findOne({_id: req.params.id}).select({token: 0});

        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.put('/edit/:id', isAuth, permit('admin'), upload.single('avatar'), async (req, res) => {
    const user = req.body;
    try {
        const whiteList = {
            username: user.username,
            displayName: user.displayName,
            role: user.role,
            phone: user.phone
        };

        if (whiteList.role === 'market') {
            whiteList.companyName = user.companyName;
            whiteList.address = user.address;
        }

        if (req.file) {
            whiteList.avatar = req.file.filename
        }

        if (user.password) {
            const salt = await bcrypt.genSalt(10);

            whiteList.password = await bcrypt.hash(user.password, salt);
        }

        const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, {$set: whiteList}, {returnNewDocument: true});

        const history = new History({
            title: req.currentUser.displayName + ' редактировал пользователя ' + user.displayName,
            comment: req.body.comment,
            type: req.body.type
        });
        await history.save();

        res.send(updatedUser);
    } catch (e) {
        res.status(500).send(e)
    }
});


router.post('/sessions', async (req, res) => {

        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(404).send({message: 'Username or password not correct!'});
        } else {
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            if (!correctPassword) {
                return res.status(404).send({message: 'Username or password not correct!'});
            }
        }

        user.addToken();
        user.save();

        res.send(user)
    }
);

router.delete('/sessions', async (req, res) => {
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

router.delete('/:id', isAuth, permit('admin'), async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findOne({_id: id});

        if (!user) return res.status(404).send({message: "User not found"});
        if (user._id.toString() === req.currentUser._id.toString()) return res.status(401).send({message: "You cannot delete yourself"});

        await User.deleteOne({_id: user._id});

        const history = new History({
            title: req.currentUser.displayName + ' удалил пользователя ' + user.displayName,
            comment: req.body.comment,
            type: req.body.type
        });
        await history.save();

        res.send('success')
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;