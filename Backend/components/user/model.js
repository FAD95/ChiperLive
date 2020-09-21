const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

let roles = {
  values: ['CHAMPION', 'ADMIN', 'USER'],
  message: 'no es un rol válido',
}
const myschema = new Schema({
  firstName: { type: String, required: [true, 'Los nombres es obligatorio'] },
  lastName: { type: String, required: [true, 'Los apellidos es obligatorio'] },
  countryCode: {
    type: Number,
    required: [true, 'Codigo del pais obligatorio'],
  },
  phone: { type: Number, required: [true, 'El telefono es obligatorio'] },
  state: {
    type: String,
    required: [true, 'El estado/departamento es obligatorio'],
  },
  city: { type: String, required: [true, 'La ciudad es obligatoria'] },
  gender: { type: String, required: [true, 'El género es obligatorio'] },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: { type: String, required: [true, 'La contraseña es obligatorio'] },
  role: { type: String, required: [true], enum: roles },
})

myschema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

myschema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

myschema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()
  delete userObject.password

  return userObject
}

myschema.plugin(uniqueValidator, {
  message: 'El email ya esta registrado',
})

const model = mongoose.model('user', myschema)

module.exports = model
