const jwt = require('jsonwebtoken');
const User = require('../models/User')

//Auth Middleware
const authorization = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.location('login.html');
    }
    try {
    const decoded = jwt.verify(token, 'thisismysecret');
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token })
    if (!user){
        return res.location('login.html');
        // throw new Error();
    }
    req.token = token;
    req.user = user;
      return next();
    } catch {
      return res.location('login.html');
    }
  };

  module.exports = authorization;