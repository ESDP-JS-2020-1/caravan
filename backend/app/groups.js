const express = require('express');

const isAuth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const Group = require('../models/Group');

const router = express.Router();

router.get('/', isAuth, permit('admin'), async (req, res) => {
    try {
        const groups = await Group.find().populate('list.user');

        res.send(groups);
    } catch (e) {

    }
});

router.post('/', isAuth, permit('admin'), async (req, res) => {
    try {
        const groupInfo = req.body;

        const groupCheck = await Group.findOne({name: groupInfo.name});

        if (groupCheck) return res.status(404).send({message: 'Such a group already exists!'});

        const group = await Group.create({name: groupInfo.name});

        console.log(group);

        res.send(group);
    } catch (e) {
        res.status(404).send(e)
    }
});

router.put('/:id', isAuth, permit('admin'), async (req, res) => {
    try {
        const groupInfo = req.body;

        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).send({message: 'There is no such group'})
        }

        if (group.list.some(user => groupInfo.list.includes(user.toString()))) {
            return res.status(404).send({message: 'You cannot add users who are already in the group'})
        } else {
            {
                console.log(groupInfo)}

            group.list = groupInfo.list;

            group.save();

            res.send(group)
        }
    } catch (e) {
        console.log(e);
        res.status(404).send(e)
    }
});

router.delete('/:id', isAuth, permit('admin'), async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).send({message: 'Group is not defined!'})
        }

        await Group.deleteOne({_id: group._id});

        res.send({message: 'Success'})
    } catch (e) {

    }
});

module.exports = router;