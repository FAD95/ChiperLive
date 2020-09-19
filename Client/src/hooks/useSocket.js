import { useEffect, useState } from 'react'
import io from 'socket.io-client'

let socket = null

const useSocket = ({ ENDPOINT }) => {
  const [serverConnected, setServerConnected] = useState(false)

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.on('connect', () => {
      setServerConnected(true)
      console.log('connected with server')
    })
    return () => {
      socket.disconnect()
      socket.off()
      setServerConnected(false)
    }
  }, [])
  return [serverConnected, socket]
}

export default useSocket
