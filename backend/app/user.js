const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Group = require('../models/Group');
const upload = require('../multer');
const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/', isAuth, permit('addUser'), upload.single('avatar'), async (req, res) => {
    try {
        const user = req.body;

        const createUser = {
            username: user.username,
            password: user.password,
            displayName: user.displayName,
            role: user.role,
            phone: user.phone,
        };

        if (req.file) {
            createUser.avatar = req.file.filename
        }

        if (createUser.role === 'market') createUser.market = {
            address: user.address,
            coordinates: user.coordinates,
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

        res.send(newUser)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/', isAuth, async (req, res) => {
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

router.get('/:id', isAuth, async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.id}).populate('group').select({token: 0});

        if (!user) {
            return res.status(404).send({message: 'Not found!'});
        }

        const groups = await Group.find({list: {$elemMatch: {user: user._id}}});
        let permissions = await Group.find({'list.user':user._id}).select({ "permissions": 1, "_id": 0});
        const permission = new Set()
        permissions.forEach(p=>p.permissions.forEach(p=> permission.add(p)));

        user.permissions = [...permission];

        user = {...user._doc}

        delete user.password;
        user.groups = groups;

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.put('/edit/:id', isAuth, permit('editUser'), upload.single('avatar'), async (req, res) => {
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

        if (req.file) user.avatar = req.file.filename;

        if (user.avatar) editableUser.avatar = user.avatar;

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
            let permissions = await Group.find({'list.user':user._id}).select({ "permissions": 1, "_id": 0});
            const permission = new Set()
            permissions.forEach(p=>p.permissions.forEach(p=> permission.add(p)));
           user.permissions= [...permission];
            user.addToken();
            user.save();

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

router.delete('/:id', isAuth, permit('deleteUser'), async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findOne({_id: id});

        if (!user) return res.status(404).send({message: "User not found"});
        if (user._id.toString() === req.currentUser._id.toString()) return res.status(401).send({message: "You cannot delete yourself"});

        user.isRemoved = true;
        user.save(req);

        res.send('success')
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/removed', isAuth, permit('getTrash'), async (req, res) => {
    try {
        const removed = await User.find({ isRemoved: true });

        res.send(removed);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;