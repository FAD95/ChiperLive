const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myschema = new Schema({
    users:[{
        type: Schema.ObjectId,
        ref: 'users_telegrom'
    }
    ]
})

const model = mongoose.model('chat',myschema);

module.exports = model;