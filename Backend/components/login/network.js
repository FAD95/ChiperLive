const express = require('express');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const {seedJwt,tokenCaducidad} =require('../../config');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller.js')

const passport = require('passport')


router.post('/',  async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        

        const Info = JSON.stringify(info)
      try {
        if (err || !user) {
          
          const error = new Error('new Error')
          return next(JSON.stringify(info))
        }
        
       
        req.login(user, { session: false }, async (err) => {
          if (err) return next(err)
         
            
          const token = jwt.sign({ user}, 'top_secret')
          return res.json({ info,token })
        })
      }
      catch(e) {
        return next(e)
      }
    })(req, res, next)
  })

module.exports = router;