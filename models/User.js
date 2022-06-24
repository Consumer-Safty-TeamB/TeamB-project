const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validate } = require('./GasReports');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value))
            {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (value.length < 7){
                throw new Error('Password length must be greater than 6')
            } 
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})


//To create public profile to return to client without password

userSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

//Generate Auth Token

userSchema.methods.generateAuthToken = async function (){
    const user = this;
    const token = jwt.sign( {_id: user._id.toString()} , 'thisismysecret'); 

    user.tokens = user.tokens.concat({token})
    await user.save();
    return token;


}

//Find by credential // login function
//To do salt

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email});

    if (!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user;
}

//middle ware for hashing password
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8);
    }

    next();
})


//Create user schema for user

const User = mongoose.model('User' , userSchema);

module.exports = User;