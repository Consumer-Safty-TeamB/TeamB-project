const express = require('express')
const router = new express.Router;
const User = require('../models/User');
const auth = require('../middleware/auth');

//create user
router.post('/users/signup' , async ( req, res) => {
    const user = new User (req.body);

    try{
        const token = await user.generateAuthToken();
        res.status(201).send({token});
    }catch (err){
        res.status(400).send(err);
    }
})

//sign in user
router.post('/users/login' , async ( req,res) => {

    try{
        const user = await User.findByCredentials(req.body.email , req.body.password);
        console.log(user);
        const token = await user.generateAuthToken();
        res.send({token});
    }catch(err){
        res.status(400).send(err);
    }
})




module.exports = router;