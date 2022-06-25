const jwt = require('jsonwebtoken');
const User = require('../models/User')

//Auth Middleware
const authorization = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      console.log('nothere');
      return res.redirect('/login.html');
    }
    try {
    const decoded = jwt.verify(token, 'thisismysecret');
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token })
    if (!user){
        return res.redirect('/login.html');
        // throw new Error();
    }
    req.token = token;
    req.user = user;
      return next();
    } catch {
      return res.redirect('/login.html');
    }
  };

  module.exports = authorization;