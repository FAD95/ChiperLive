const express = require('express')
const user = require('../components/user/network')
const login = require('../components/login/network')
const routes = function (server) {
  server.use('/login', login)
  server.use('/user', user)
  server.use('/singup', user)
}

module.exports = routes
