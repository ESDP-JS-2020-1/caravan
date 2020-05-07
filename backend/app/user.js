const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const History = require('../models/History');
const upload = require('../multer');
const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/', isAuth, permit('admin'), upload.single('avatar'), async (req, res) => {
    try {
        const user = req.body;

        if (req.file) {
            req.body.avatar = req.file.filename
        }

        const createUser = {
            username: user.username,
            password: user.password,
            displayName: user.displayName,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
        };

        if(createUser.role === 'market') createUser.market = {
            address: user.address,
            coordinates: user.coordinates,
            companyName: user.companyName,
        };

        if(createUser.role === 'courier') createUser.courier = {
            carName: user.carName,
            carVolume: user.carVolume,
            carRefrigerator: user.carRefrigerator
        };

        const newUser = new User(createUser);

        const history = new History({
            title: req.currentUser.displayName + ' добавил пользователя ' + user.displayName,
            comment: req.body.comment,
            type: 'add'
        });
        await history.save();

        newUser.addToken();
        await newUser.save();

        res.send(newUser)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.get('/', isAuth, async (req, res) => {
    try {
        if (req.query.role) {
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

        const editableUser = await User.findOne({username: user.username});

        if (user.role === 'market') {
            editableUser.market.companyName = user.companyName;
            editableUser.market.address = user.address;
        }

        if (user.role === 'courier') {
            editableUser.courier.carName = user.carName;
            editableUser.courier.carVolume = user.carVolume;
            editableUser.courier.carRefrigerator = user.carRefrigerator;
        }

        if (req.file) user.avatar = req.file.filename;

        if (user.password) {
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(user.password, salt);
        }

        editableUser.username = user.username;
        editableUser.displayName = user.displayName;
        editableUser.role = user.role;
        editableUser.phone = user.phone;



        await History.create({
            title: req.currentUser.displayName + ' редактировал пользователя ' + user.displayName,
            comment: req.body.comment,
            type: 'edit'
        });
        await editableUser.save();

        res.send(editableUser);
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
            type: 'delete'
        });
        await history.save();

        res.send('success')
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;