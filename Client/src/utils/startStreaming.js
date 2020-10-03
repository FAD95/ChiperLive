import io from 'socket.io-client'
import axios from 'axios'

const startStreaming = (canvasRef, inputStreamRef, mediaRecorderRef, url) => {
  const socket = io(`http://localhost:8080?url=${url}`)
  const videoOutputStream = canvasRef.current.captureStream(30) // 30 FPS

  const audioStream = new MediaStream()
  const audioTracks = inputStreamRef.current.getAudioTracks()
  audioTracks.forEach(function (track) {
    audioStream.addTrack(track)
  })

  const outputStream = new MediaStream()
  ;[audioStream, videoOutputStream].forEach(function (s) {
    s.getTracks().forEach(function (t) {
      outputStream.addTrack(t)
    })
  })

  mediaRecorderRef.current = new MediaRecorder(outputStream, {
    mimeType: 'video/webm',
    videoBitsPerSecond: 3000000
  })

  mediaRecorderRef.current.addEventListener('dataavailable', (e) => {
    socket.emit('data', e.data)
  })

  mediaRecorderRef.current.start(1000)
}

export default startStreaming
