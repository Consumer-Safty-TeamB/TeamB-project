const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    message:String,
    author:String,
    time:Number
});

const Message = mongoose.model("message", MessagesSchema);

module.exports = Message;