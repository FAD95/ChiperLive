const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myschema = new Schema({
    chat:{type:Schema.ObjectId,
        ref:'chat',
    },
    user:{
        type: Schema.ObjectId,
        ref:'users_telegrom',
    },
     message:String,
     date:Date,
     file:String,
})

const model = mongoose.model('messages',myschema);

module.exports = model;