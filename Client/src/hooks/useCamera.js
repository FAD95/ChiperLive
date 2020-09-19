import { useEffect, useState, useRef } from 'react'

const useCamera = () => {
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const inputStreamRef = useRef()
  const videoRef = useRef()
  const canvasRef = useRef()
  const requestAnimationRef = useRef()

  const updateCanvas = () => {
    if (
      !videoRef.current ||
      videoRef.current.ended ||
      videoRef.current.paused
    ) {
      return
    }
    const ctx = canvasRef.current.getContext('2d')

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.clientWidth,
      videoRef.current.clientHeight
    )

    requestAnimationRef.current = requestAnimationFrame(updateCanvas)
  }

  useEffect(() => {
    const reqCamera = async () => {
      try {
        inputStreamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { facingMode: 'user' },
        })
      } catch (error) {
        console.error(error)
      }
    }

    reqCamera().then(async () => {
      if (videoRef.current) {
        videoRef.current.srcObject = inputStreamRef.current
        try {
          await videoRef.current.play()
          canvasRef.current.height = videoRef.current.clientHeight
          canvasRef.current.width = videoRef.current.clientWidth
          requestAnimationRef.current = requestAnimationFrame(updateCanvas)
          setCameraEnabled(true)
        } catch (error) {
          console.error(error)
        }
      }
    })

    return () => {
      if (inputStreamRef.current)
        inputStreamRef.current.getTracks().forEach((track) => {
          track.stop()
        })
      setCameraEnabled(false)
    }
  }, [])
  return [
    { inputStreamRef, videoRef, canvasRef, requestAnimationRef, cameraEnabled },
  ]
}

export default useCamera
