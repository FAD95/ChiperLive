const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const child_process = require('child_process')

io.on('connection', (socket) => {
  console.log(socket.id + ' connected')
  const rtmpUrl =
    'rtmp://prueba1-chiperlive-usso.channel.media.azure.net:1935/live/3a88a26fcfc64bb8a08b8204c3a3f0af/prueba'

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
    console.log(data.toString())
    console.log('FFmpeg STDERR:', data.toString())
  })

  socket.on('data', (msg) => {
    if (Buffer.isBuffer(msg)) {
      ffmpeg.stdin.write(msg)
    }
  })

  socket.on('close', (e) => {
    ffmpeg.kill('SIGINT')
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
})

server.listen(8080, () => {
  console.log('Server running on port 8080')
})
