const express = require('express')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')
const config = require('./config')
const bodyparser = require('body-parser')
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log(socket.id + ' connected')
})

const router = require('./src/network/routes')

app.use(cors())
app.use(bodyparser.json())

router(app)

server.listen(config.port, () => {
  console.log('Server running on port 8080')
})
