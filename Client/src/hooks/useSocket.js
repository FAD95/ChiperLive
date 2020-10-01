import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'

let socket = null

const useSocket = ({ ENDPOINT }) => {
  const [serverConnected, setServerConnected] = useState(false)
  const currentUser = useSelector((store) => store.currentUser)

  useEffect(() => {
    const userID = currentUser._id
    socket = io.connect(`${ENDPOINT}/${userID}`)
    socket.on('welcome', (res) => {
      console.log(res)
      setServerConnected(true)
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
