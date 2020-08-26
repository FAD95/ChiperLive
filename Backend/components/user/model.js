const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myschema = new Schema({
    nombres: String,
    apellidos :String,
    telefono :String,
    correo :String,
    password : String
     
})

const model = mongoose.model('usuarios',myschema);

module.exports = model;