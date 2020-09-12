import { useRef } from 'react';
import io from 'socket.io-client';

const Index = () => {

  const inputStreamRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();
  const requestAnimationRef = useRef();
  const mediaRecorderRef = useRef();
  
  const useCamera = async () => {
    inputStreamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
  
    videoRef.current.srcObject = inputStreamRef.current;

    await videoRef.current.play();

    canvasRef.current.height = videoRef.current.clientHeight;
    canvasRef.current.width = videoRef.current.clientWidth;

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);
  }

  const updateCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.clientWidth,
      videoRef.current.clientHeight
    );

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);
  }

  const startStreaming = () => {
    const socket = io('http://localhost:8080/');

    const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS

    const audioStream = new MediaStream();
    const audioTracks = inputStreamRef.current.getAudioTracks();
    audioTracks.forEach(function (track) {
      audioStream.addTrack(track);
    });

    const outputStream = new MediaStream();
    [audioStream, videoOutputStream].forEach(function (s) {
      s.getTracks().forEach(function (t) {
        outputStream.addTrack(t);
      });
    });

    mediaRecorderRef.current = new MediaRecorder(outputStream, {
      mimeType: 'video/webm',
      videoBitsPerSecond: 3000000,
    });

    mediaRecorderRef.current.addEventListener('dataavailable', e => {
      socket.emit('data', e.data);
    });

    mediaRecorderRef.current.start(1000);
  }

  return (
    <React.Fragment>
      <button onClick={useCamera}>Encender camara</button>
      <video ref={videoRef} muted playsInline></video>
      <canvas ref={canvasRef}></canvas>
      <button onClick={startStreaming}>Empezar transmisión</button>
    </React.Fragment>  
  )
};

export default Index;