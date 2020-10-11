const stopStreaming = (mediaRecorderRef, socket) => {
  mediaRecorderRef.current.stop()
  socket.disconnect()
}

export default stopStreaming
