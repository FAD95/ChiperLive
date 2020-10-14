const express = require('express')
const user = require('../components/user/network')
const login = require('../components/login/network')
const loginMediaServices = require('../components/loginMediaServices/network')
const startLiveEvent = require('../components/liveEvent/start')
const stopLiveEvent = require('../components/liveEvent/stop')
const routes = function (server) {
  server.use('/login', login)
  server.use('/user', user)
  server.use('/singup', user)
  server.use('/loginMediaServices', loginMediaServices)
  server.use('/startLiveEvent', startLiveEvent)
  server.use('/stopLiveEvent', stopLiveEvent)
}

module.exports = routes
