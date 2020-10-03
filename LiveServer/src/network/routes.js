const express = require('express')
const loginMediaServices = require('../components/loginMediaServices/network')
const startStreaming = require('../components/startStreaming/network')
const routes = function (server) {
  server.use('/loginMediaServices', loginMediaServices)
  server.use('/startStreaming', startStreaming)
}

module.exports = routes
