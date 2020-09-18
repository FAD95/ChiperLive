const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

let roles ={
        values: ["CHAMPION","ADMIN","USER"],
        message : 'no es un rol válido'
}
const myschema = new Schema({
    nombres: {type : String,
        required :[true,"Los nombres es obligatorio"]
             },
    apellidos : {type : String,
        required :[true,"los apellidos es obligatorio"]
       },
    telefono :{type : String,
        required :[true,"El telefono es obligatorio"]
       },
    correo :{type : String,
             required :[true,"El correo es obligatorio"],
             unique :true
            },
    password :{type : String,
        required :[true,"la contraseña es obligatorio"]
       },
    ciudad : String,  
     rol :{type : String,
        required :[true],
        enum :roles,
       }  
     
})



myschema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

myschema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password)
    return compare
}

myschema.methods.toJSON = function(){
       let user = this
       let userObject = user.toObject()
       delete userObject.password
       
       return userObject
}

myschema.plugin(uniqueValidator,{
    message :'debe ser unico'
})

const model = mongoose.model('usuarios',myschema);

module.exports = model;