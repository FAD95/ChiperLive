const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const controller = require('../components/login/controller')
const bcrypt = require('bcrypt')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
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
                  })
                 .catch(e =>{
                    done(null, false, { message: ' usuario o contraseña incorrecta' }) 
                 }) 
   
            
       })
       .catch( e =>{
       done(null, false, { message: 'e:'+e })
       })
      
       } else {
        done(null, false, { message: 'debe filtrar por un correo' });
       }
    }
))

passport.use(new JWTStrategy({
    secretOrKey: seedJwt,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(error)
    }
}))