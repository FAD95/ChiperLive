const express = require('express')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')
const bodyparser = require('body-parser')

const router = require('./src/network/routes')

app.use(cors())
app.use(bodyparser.json())

router(app)

module.exports = server
