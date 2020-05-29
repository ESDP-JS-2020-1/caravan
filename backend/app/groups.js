const express = require('express');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const permission = require('../permissionsForUsers');

const Group = require('../models/Group');
const router = express.Router();

router.get('/', isAuth, permit('getGroup'), async (req, res) => {
    try {
        const groups = await Group.find({ isRemoved: false });

        res.send(groups);
    } catch (e) {
        res.status(404).send(e)
    }
});

router.get('/permissions', isAuth, permit('getGroup'), async (req, res) => {
    try {
        res.send(permission);
    } catch (e) {
        res.status(404).send(e)
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

        if (groupCheck) return res.status(404).send({message: 'Such a group already exists!'});

        const group = Group({name: groupInfo.name, permissions: groupPermissions});
        group.save(req);

        res.send(group);
    } catch (e) {
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

        if (group.name === groupInfo.name.name) return res.status(404).send({message: 'Such a group already exists!'});

        group.name = groupInfo.name.name;

        group.permissions = groupPermissions;

        group.save(req);

        res.send(group)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.put('/user', isAuth, permit('addGroup'), async (req, res) => {
    try {
        const group = await Group.findOne({_id: req.body.group});
        group.list.pull({_id: req.body.user});

        group.save(req);


        res.send(group)
    } catch (e) {

    }
});

router.put('/:id', isAuth, permit('addGroup'), async (req, res) => {
    try {
        const groupInfo = req.body;

        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).send({message: 'There is no such group'})
        }

        if (group.list.some(user => groupInfo.list.includes(user.user.toString()))) {
            return res.status(404).send({message: 'You cannot add users who are already in the group'})
        } else {

            group.list.push({user: groupInfo.list});

            group.save(req);

            res.send(group)
        }
    } catch (e) {
        res.status(404).send(e)
    }
});

router.delete('/:id', isAuth, permit('deleteGroup'), async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).send({message: 'Group is not defined!'})
        }

        group.isRemoved = true;
        group.save(req);

        res.send({message: 'Success'})
    } catch (e) {

    }
});

module.exports = router;