const express = require('express')
const loginMediaServices = require('../components/loginMediaServices/network')
const startLiveEvent = require('../components/liveEvent/start')
const stopLiveEvent = require('../components/liveEvent/stop')
const routes = function (server) {
  server.use('/loginMediaServices', loginMediaServices)
  server.use('/startLiveEvent', startLiveEvent)
  server.use('/stopLiveEvent', stopLiveEvent)
}

module.exports = routes
