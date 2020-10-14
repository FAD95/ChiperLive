const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../components/user/model')
const controller = require('../components/login/controller')
const bcrypt = require('bcrypt')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const config = require('../../config')

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
            if (!data)
              return done(null, false, {
                message: 'usuario o contraseña incorrecta',
              })
            bcrypt
              .compare(password, data.password)
              .then(() => {
                console.log('User login successfull')
                return done(null, data, { message: 'Login successfull' })
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

passport.use(
  new JWTStrategy(
    {
      secretOrKey: config.seedJwt,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (e) {
        done(error)
      }
    }
  )
)
