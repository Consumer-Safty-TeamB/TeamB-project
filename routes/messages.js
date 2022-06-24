const express = require('express');
const Message = require('../models/Message');
const router = express.Router();
router.route('/').get(async (req, res, err) =>{
    const records = await Message.find();
    res.send(records);
});

router.route('/').post(async (req, res, err) =>{
    
    const message = await new Message({message:req.body.message, author:req.body.author, time:Date.now()});
    await message.save();
    res.send({msg:'success', posted:message, sent:req.body});
    console.log(req.body, message);
});

router.route('/').delete((req, res, err) =>{

});

module.exports = router;