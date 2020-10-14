const express = require('express')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')
const bodyparser = require('body-parser')

app.use(cors())
app.use(bodyparser.json())


module.exports = server
