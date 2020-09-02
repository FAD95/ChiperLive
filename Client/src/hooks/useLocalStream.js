import { useEffect } from 'react'
import isMobile from '../utils/isMobile'

const useLocalStream = () => {
  useEffect(() => {
    let localStream

    navigator.mediaDevices
      .getUserMedia({
        video: isMobile()
          ? { facingMode: 'user' }
          : { width: { exact: 480 }, height: { exact: 640 } },
        audio: false,
      })
      .then((stream) => {
        localStream = stream
        var video = document.querySelector('video')
        video.srcObject = stream
      })
      .catch((err) => {
        console.error(err)
        return
      })

    return () => {
      localStream.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }, [])
}

export default useLocalStream
