const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async ( req, res, next) => {
    try {
        const token = req.cookies.access_token;
        console.log(token);
        // const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, 'thisismysecret');
        const user = await User.findOne({_id: decoded._id , 'tokens.token': token})

        if (!user){
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    }catch(err){
        res.redirect('/');
        // res.status(401).send({error: 'Please authenticate.'})
    }
}

module.exports = auth; //gits