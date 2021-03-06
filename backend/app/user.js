const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Group = require('../models/Group');
const upload = require('../multer');
const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');
const fs = require('fs');
const permissions = require('../permissions');
const NominatedRequest = require('../models/NominatedRequest')
const Request = require('../models/Request')

const router = express.Router();

router.get('/removed', isAuth, permit(permissions.GET_TRASH), async (req, res) => {
    try {
        const removed = await User.find({isRemoved: true});

        res.send(removed);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', isAuth, permit(permissions.GET_STATISTIC), upload.single('avatar'), async (req, res) => {
    try {
        const user = req.body;

        const createUser = {
            username: user.username,
            password: user.password,
            displayName: user.displayName,
            role: user.role,
            phone: user.phone,
        };

        if (createUser.role === 'market' && user.coordinates === 'undefined') {

            return res.status(404).send({message: 'Please provide coordinates!'})
        }
        if (req.file) {
            createUser.avatar = req.file.filename
        }

        if (createUser.role === 'market') createUser.market = {
            address: user.address,
            coordinates: JSON.parse(user.coordinates),
            companyName: user.companyName,
        };

        if (createUser.role === 'courier') createUser.courier = {
            carName: user.carName,
            carVolume: user.carVolume,
            carRefrigerator: user.carRefrigerator
        };

        const newUser = new User(createUser);

        newUser.addToken();
        await newUser.save(req);
        res.send(newUser);

        const group = await Group.find({name: JSON.parse(req.body.group)});
        if (!group) return res.status(404).send({message: 'Group not found!'});
        group.map(async list => {
            list.list.push({user: newUser._id});
            await list.save()
        });

    } catch (e) {
        res.status(500).send(e)

    }
});

router.get('/locations', isAuth, permit(permissions.GET_MARKETS_LOCATIONS), async (req, res) => {
    try {
        const users = await User.find({isRemoved: false, role: 'market'}).populate('group').select({token: 0});
        return res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/', isAuth, permit(permissions.GET_USER), async (req, res) => {
    try {
        if (req.query.role) {
            const users = await User.find({role: req.query.role}).populate('group').select({token: 0});

            return res.send(users)
        }
        const users = await User.find({isRemoved: false}).populate('group').select({token: 0});

        return res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/:id', isAuth, permit(permissions.GET_USER), async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.id}).populate('group').select({token: 0});

        if (!user) {
            return res.status(404).send({message: 'Not found!'});
        }

        const groups = await Group.find({list: {$elemMatch: {user: user._id}}});
        let permissions = await Group.find({'list.user': user._id}).select({"permissions": 1, "_id": 0});
        const permission = new Set();
        permissions.forEach(p => p.permissions.forEach(p => permission.add(p)));

        user.permissions = [...permission];

        user = {...user._doc};

        delete user.password;
        user.groups = groups;

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.put('/edit/:id', isAuth, permit(permissions.EDIT_USER), upload.single('avatar'), async (req, res) => {
    const user = req.body;

    try {
        const editableUser = await User.findOne({_id: req.params.id});

        if (user.role === 'market') {
            editableUser.market = {
                companyName: user.companyName,
                address: user.address,
                coordinates: {lat: user.lat, lng: user.lng},
            }
        }

        if (user.role === 'courier') {
            editableUser.courier = {
                carName: user.carName,
                carVolume: user.carVolume,
                carRefrigerator: user.carRefrigerator,
            }
        }

        if (req.file) {
            fs.unlink('./public/uploads/userAvatar/' + editableUser.avatar, function (err) {
                if (err) console.log(err);

            });

            editableUser.avatar = req.file.filename;
        }


        if (user.password) {
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(user.password, salt);
            await User.updateOne({_id: req.params.id}, {password: user.password});
        }

        editableUser.username = user.username;
        editableUser.displayName = user.displayName;
        editableUser.role = user.role;
        editableUser.phone = user.phone;

        await editableUser.save(req);

        res.send(editableUser);
    } catch (e) {
        res.status(500).send(e)
    }
});


router.post('/sessions', async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username}).populate('group');
            if (!user) {
                return res.status(404).send({message: 'Username or password not correct!'});
            } else {
                const correctPassword = await bcrypt.compare(req.body.password, user.password);
                if (!correctPassword) {
                    return res.status(404).send({message: 'Username or password not correct!'});
                }
            }
            let permissions = await Group.find({'list.user': user._id}).select({"permissions": 1, "_id": 0});
            const permission = new Set();
            permissions.forEach(p => p.permissions.forEach(p => permission.add(p)));
            user.permissions = [...permission];
            user.addToken();
            user.save();

            if (user.isRemoved) {
                return res.status(401).send({message: 'User width this username in removed'})
            }

            res.send(user)
        } catch (e) {
            return res.status(500).send(e)
        }
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

router.delete('/:id', isAuth, permit(permissions.DELETE_USER), async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findOne({_id: id});

        if (!user) return res.status(404).send({message: "User not found"});
        if (user._id.toString() === req.currentUser._id.toString())
            return res.status(401).send({message: "You cannot delete yourself"});

        const nominatedOrders = await NominatedRequest.find({courier: user._id})
        for (let i = 0; i < nominatedOrders.length; i++) {
            const request = await Request.findOne({_id: nominatedOrders[i].request._id});
            request.status = 'pending';
            request.save();
            nominatedOrders[i].delete()
        }

        user.isRemoved = true;
        user.date = Date.now();
        user.save(req);

        res.send('success')
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;