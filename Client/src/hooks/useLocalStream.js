import { useEffect } from 'react'

const useLocalStream = async (isMobile) => {
  useEffect(() => {
    let localStream = {}
    console.log({ isMobile })
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: isMobile
            ? { facingMode: 'user' }
            : { width: { exact: 480 }, height: { exact: 640 } },
          audio: false,
        })
        localStream = stream
        const video = document.querySelector('video')
        video.srcObject = stream
      } catch (error) {
        console.error(error)
        return
      }
    }
    getMedia()
    return () => {
      localStream.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }, [])
}

export default useLocalStream
