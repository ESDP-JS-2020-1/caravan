const express = require('express');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const permission = require('../permissions');

const Group = require('../models/Group');
const router = express.Router();

router.get('/removed', isAuth, permit('getTrash'), async (req, res) => {
    try {
        const removed = await Group.find({ isRemoved: true });

        res.send(removed);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/', isAuth, permit('getGroup'), async (req, res) => {
    try {
        const groups = await Group.find({isRemoved: false});
        res.send(groups);
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/permissions', isAuth, permit('getGroup'), async (req, res) => {
    try {
        res.send(Object.values(permission));
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/:id', isAuth, permit('getGroup'), async (req, res) => {
    try {
        const group = await Group.findOne({_id: req.params.id}).populate('list.user');

        res.send(group);
    } catch (e) {
        res.status(404).send(e)
    }
});

router.post('/', isAuth, permit('addGroup'), async (req, res) => {
    try {
        const groupInfo = req.body;
        const groupPermissions = [];
        Object.keys(req.body.permissions).forEach(elem => {
            if (req.body.permissions[elem] === true) groupPermissions.push(elem)
        });

        const groupCheck = await Group.findOne({name: groupInfo.name});

        if (groupCheck) return res.status(400).send({message: 'Such a group already exists!'});

        const group = Group({name: groupInfo.name, permissions: groupPermissions});
        group.save(req);

        res.send(group);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/edit/:id', isAuth, permit('editGroup'), async (req, res) => {
    try {
        const groupInfo = req.body;
        const groupPermissions = [];
        Object.keys(req.body.permissions).forEach(elem => {
            if (req.body.permissions[elem] === true) groupPermissions.push(elem)
        });

        const group = await Group.findOne({_id: req.params.id});

        group.name = groupInfo.name.name;

        group.permissions = groupPermissions;

        group.save(req);

        res.send(group)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.put('/user', isAuth, permit('addGroup'), async (req, res) => {
    try {
        const group = await Group.findOne({_id: req.body.group});
        if (!group) return res.status(404).send({message: 'Group not found!'});

        group.list.pull({_id: req.body.user});
        group.save(req);

        res.send(group)
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/:id', isAuth, permit('addGroup'), async (req, res) => {
    try {
        const groupInfo = req.body;

        const group = await Group.findById(req.params.id);
        if (!group) return res.status(404).send({message: 'Group not found!'});

        if (group.list.some(user => groupInfo.list.includes(user.user.toString()))) {
            return res.status(400).send({message: 'You cannot add users who are already in the group'})
        } else {
            group.list.push({user: groupInfo.list});
            group.save(req);

            res.send(group)
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

router.delete('/:id', isAuth, permit('deleteGroup'), async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) return res.status(404).send({message: 'Group not found'});

        group.isRemoved = true;
        group.date = Date.now();
        group.save(req);

        res.send({message: 'Success'})
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;