const express = require('express');
const History = require('../models/History');
const Request = require('../models/Request');
const auth = require('../middleware/isAuth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/:id', auth, async (req, res) => {
	try {
		const requests = await Request.findOne({_id: req.params.id}).populate('user');

		return res.send(requests);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get('/', auth, async (req, res) => {
    try {
        if (req.currentUser.role === 'market') {
            const requests = await Request.find({user: req.currentUser._id}).populate('user');

            return res.send(requests);
        }
        const requests = await Request.find().populate('user');

        return res.send(requests);
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/:id', auth, async (req, res) => {
    try {

        const requests = await Request.find({_id: req.params.id});
        if (!requests){
        	return res.status(404).send({message:'Not found'})
		}
        return res.send(requests);


    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', [auth, permit('market', 'admin')], async (req, res) => {
	try {
		const requests = {
			user: req.currentUser,
			products: req.body.products,
			comment: req.body.comment
		};

		console.log(requests);

		await Request.create(requests);


        return res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id',[auth,permit('admin')],async (req,res)=>{
    const request = req.body;
    try {
        const requestOne = await Request.findOne({_id:req.params.id}).populate('user');
        if(!requestOne){
            return res.status(404).send({message:'Not found'})
        }
        const whiteList ={
            user: req.currentUser,
            products: request.products,
            comment: request.comment
        };
      const updateRequest =  await Request.findOneAndUpdate(
          {_id: req.params.id},
          {$set: whiteList},
          {returnNewDocument: true}
          );
        let historyData = {title: req.currentUser.displayName +' отредактировал заявку ' + requestOne.user.displayName, type:'edit'};

        if (requestOne.comment){
            historyData.comment = requestOne.comment
        }
        const history = new History(historyData);
        await history.save();
        return res.send(updateRequest)
    }catch (e) {
        res.status(500).send(e)
    }


});

router.delete('/:id',[auth,permit('admin','operator')],async (req,res)=>{

    let request = req.body;
    try {
        const requestOne = await Request.findOne({_id: req.params.id});

        if (!requestOne) {
            return res.status(404).send({message: 'Request not found'})
        }

        let historyData = {title: req.currentUser.displayName +' удалил заявку ' + requestOne._id, type:'delete'};

        if (requestOne.comment){
            historyData.comment = requestOne.comment
        }
        const history = new History(historyData);
        await history.save();

        await Request.deleteOne({_id: req.params.id});
        return res.send({message: 'Delete'})
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;

