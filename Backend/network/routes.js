const express =require('express');
const message = require('../components/message/network')
const user = require('../components/user/network')
const chat = require('../components/chat/network')
const login = require ('../components/login/network')
const routes = function(server){
  
  server.use('/login',login);
  server.use('/user',user);
  server.use('/chat',chat)
}

module.exports = routes;