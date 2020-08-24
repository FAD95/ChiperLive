import { useEffect } from 'react'
import io from 'socket.io-client'

const useLiveStream = () => {
  useEffect(() => {
    let liveStream = {}
    const peers = {}

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        liveStream = stream
        const socket = io('http://localhost:8080/')

        const broadcaster = {
          room: 0,
          name: 'Alejandro Zapata Molina'
        }

        socket.emit('new broadcaster', broadcaster.room)

        socket.on('new viewer', viewer => {
          peers[viewer.id] = new RTCPeerConnection({
            iceServers: [
              { urls: 'stun:stun.services.mozilla.com' },
              { urls: 'stun:stun.l.google.com:19302' }
            ]
          })

          stream.getTracks().forEach(track => {
            peers[viewer.id].addTrack(track, stream)
          })

          peers[viewer.id].onicecandidate = event => {
            if (event.candidate) {
              socket.emit('candidate', viewer.id, {
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
              })
            }
          }

          peers[viewer.id].createOffer()
            .then(sessionDescription => {
              peers[viewer.id].setLocalDescription(sessionDescription)

              socket.emit('offer', viewer.id, {
                type: 'offer',
                sdp: sessionDescription,
                broadcaster: broadcaster
              })
            })
            .catch(err => {
              console.error(err)
            })
        })

        socket.on('answer', (viewerId, event) => {
          peers[viewerId].setRemoteDescription(new RTCSessionDescription(event))
        })

        socket.on('candidate', function (id, event) {
          console.log(event)
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: event.label,
            candidate: event.candidate
          })
          peers[id].addIceCandidate(candidate)
        })
      })
      .catch(err => {
        console.error(err)
        return
      })
      return () => {
        liveStream.getTracks().forEach((track) => {
          track.stop()
        })
      }
  }, [])
 
}

export default useLiveStream
