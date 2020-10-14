const express = require('express')
var app = express()
const config = require('./config')

const bodyparser = require('body-parser')
const db = require('./src/db')
const router = require('./src/network/routes')
const cors = require('cors')

db.connect(config.dbUrl)

require('./src/auth/auth')

app.use(cors())
app.use(bodyparser.json())

router(app)

app.use(config.publicRoute, express.static('public'))
app.listen(config.port, function () {
  console.log(
    `La aplicacion está escuchando en ${config.host}:${config.port}${config.publicRoute}`
  )
})
