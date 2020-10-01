const server = require('./server')
const config = require('./config')
const io = require('socket.io')(server)
const child_process = require('child_process')

const { addUser, removeUser, getUser } = require('./src/network/users')

const workspaces = io.of(/^\/\w+$/)

workspaces.on('connection', (socket) => {
  const workspace = socket.nsp

  workspace.emit('welcome', `${workspace.name} connected`)

  const rtmpUrl =
    'rtmp://prueba3-chiperlive-usso.channel.media.azure.net:1935/live/3a88a26fcfc64bb8a08b8204c3a3f0af/p'

  const ffmpeg = child_process.spawn('ffmpeg', [
    '-i',
    '-',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-ar',
    '44100',
    '-r',
    '30',
    '-g',
    '60',
    '-keyint_min',
    '60',
    '-b:v',
    '400000',
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-bufsize',
    '400k',
    '-maxrate',
    '400k',
    '-f',
    'flv',
    rtmpUrl,
  ])

  ffmpeg.on('close', (code, signal) => {
    console.log(
      'FFmpeg child process closed, code ' + code + ', signal ' + signal
    )
    socket.disconnect(true)
  })

  ffmpeg.stdin.on('error', (e) => {
    console.log('FFmpeg STDIN Error', e)
  })

  ffmpeg.stderr.on('data', (data) => {
    console.log('FFmpeg STDERR:', data.toString())
  })

  workspace.on('data', (msg) => {
    if (Buffer.isBuffer(msg)) {
      ffmpeg.stdin.write(msg)
    }
  })

  workspace.on('close', (e) => {
    ffmpeg.kill('SIGINT')
  })

  workspace.on('disconnect', () => {
    console.log(`User ${socket.id} has left`)
    const user = removeUser(socket.id)
  })
})

// this middleware will be assigned to each namespace
workspaces.use((socket, next) => {
  next()
})

server.listen(config.port, () => {
  console.log('Server running on port 8080')
})
