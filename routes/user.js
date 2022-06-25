const express = require('express')
const router = new express.Router;
const User = require('../models/User');
const authorization = require('../middleware/authorization');

//create user
router.post('/users/signup' , async ( req, res) => {
    const user = new User (req.body);

    try{
        const token = await user.generateAuthToken();
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          }).status(201).send({token});
    }catch (err){
        res.status(400).send(err);
    }
})

//sign in user
router.post('/users/login' , async ( req,res) => {

    try{
        const user = await User.findByCredentials(req.body.email , req.body.password);
        const token = await user.generateAuthToken();

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          }).send();
    }catch(err){
        res.status(400).send(err);
    }
})

//logout user
router.post("/users/logout", authorization, async (req, res) => {
    
    try{
        
        req.user.tokens = req.user.tokens.filter((token)=> {
            return token.token !== req.token
        })
        await req.user.save();

        res.send();
    }catch(err){
        res.status(500).send();
    }
  });


module.exports = router;