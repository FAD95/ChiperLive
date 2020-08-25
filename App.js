import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RTCPeerConnection, RTCIceCandidate, RTCView } from 'react-native-webrtc';
import io from 'socket.io-client';

export default function App() {

  const [stream, setStream] = useState(null);

  useEffect(() => {
    const socket = io('http://192.168.0.6:8080/');
    let peer;
    const viewer = {
      room: 0,
      name: 'Milton Herrera'
    }

    console.log(socket);

    socket.emit('new viewer', viewer);

    socket.on('offer', (broadcaster, sdp) => {
      peer = new RTCPeerConnection({ 
        iceServers: [
          { urls: "stun:stun.services.mozilla.com" },
          { urls: "stun:stun.l.google.com:19302" },
        ] 
      });
      peer.setRemoteDescription(sdp);

      peer.createAnswer()
        .then(sessionDescription => {
          peer.setLocalDescription(sessionDescription);

          socket.emit('answer', {
            type: 'answer',
            sdp: sessionDescription,
            room: viewer.room
          })
        })

      peer.ontrack = event => {
        console.log(event.streams[0]);
        setStream(event.streams[0]);
      }

      peer.onicecandidate = event => {
        if (event.candidate) {
          socket.emit("candidate", broadcaster.id, {
            type: "candidate",
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          });
        }
      }
    })

    socket.on("candidate", function (id, event) {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });
      peer.addIceCandidate(candidate);
    });
  })

  return (
    <View style={styles.container}>
      <Text>Hola movil</Text>
      {
        stream 
          ? <RTCView streamURL={stream.toURL()} />
          : <Text>Cargando</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});