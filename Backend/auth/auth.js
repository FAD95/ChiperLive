const passport = require('passport')
const localStrategy = require('passport-local').Strategy
<<<<<<< HEAD
=======
const User = require('../components/user/model')
>>>>>>> master
const controller = require('../components/login/controller')
const bcrypt = require('bcrypt')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
<<<<<<< HEAD
const {seedJwt } = require('../config');





passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
  
       if (email){
          
       controller.getUser(email)
       .then ((data)=>{
            console.log(data) 
           
            
              if (!data) return done(null, false, { message: 'usuario o contraseña incorrecta' })
              
               
                
                bcrypt.compare(password, data.password)
                .then(match => {
                   
                   if (match == true){
                  return done(null, data, { message: 'Login successfull' }) 
                  }else {
                    done(null, false, { message: ' usuario o contraseña incorrecta' }) 
                  }
=======

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.create({ email, password })
        return done(null, user)
      } catch (e) {
        done(e)
      }
    }
  )
)

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      if (email) {
        controller
          .getUser(email)
          .then((data) => {
            console.log(data)

            if (!data)
              return done(null, false, {
                message: 'usuario o contraseña incorrecta',
              })
            bcrypt
              .compare(password, data.password)
              .then((match) => {
                if (match == true) {
                  return done(null, data, { message: 'Login successfull' })
                } else {
                  done(null, false, {
                    message: ' usuario o contraseña incorrecta',
>>>>>>> master
                  })
                }
              })
              .catch((e) => {
                done(null, false, {
                  message: ' usuario o contraseña incorrecta',
                })
              })
          })
          .catch((e) => {
            done(null, false, { message: 'e:' + e })
          })
      } else {
        done(null, false, { message: 'debe filtrar por un correo' })
      }
    }
  )
)

<<<<<<< HEAD
passport.use(new JWTStrategy({
    secretOrKey: seedJwt,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
}, async (token, done) => {
    try {
=======
passport.use(
  new JWTStrategy(
    {
      secretOrKey: 'top_secret',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
    },
    async (token, done) => {
      try {
>>>>>>> master
        return done(null, token.user)
      } catch (e) {
        done(error)
      }
    }
  )
)
