import { useEffect, useRef, useState } from 'react'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import { useRouter } from 'next/router'
import io from 'socket.io-client'

import Head from '../src/components/head'
import ButtonBottom from '../src/components/ButtonBottom'
import Video from '../src/components/Video'
import InfoBottom from '../src/components/InfoBottom'

import useCamera from '../src/hooks/useCamera'
import useAuth from '../src/hooks/useAuth'

import startStreaming from '../src/utils/startStreaming'

import { useSelector, useDispatch } from 'react-redux'
import setIsLive from '../src/redux/actions/setIsLive'

const ENDPOINT = process.env.SERVER
const LIVE_ENDPOINT = process.env.LIVE_SERVER

const getSocket = (rtmpUrl) => {
  let socket = null
  if (!socket) {
    socket = io(`${LIVE_ENDPOINT}/?url=${rtmpUrl}`, {
      reconnection: false,
    })
  }
  return socket
}

function Live() {
  const liveName = useRef()
  const mediaRecorderRef = useRef()

  const [creatingStreaming, setCreatingStreaming] = useState(false)

  const [logged] = useAuth('/live')

  const [{ inputStreamRef, videoRef, canvasRef, cameraEnabled }] = useCamera()

  const router = useRouter()

  const isLive = useSelector((store) => store.isLive)
  const userId = useSelector((store) => store.currentUser._id)
  const dispatch = useDispatch()

  const handleStartStreaming = async (e) => {
    e.preventDefault()
    if (!liveName.current.value) {
      alert('Debe asignarle un nombre al live')
      return
    }
    try {
      setCreatingStreaming(true)
      const res = await axios.post(`${ENDPOINT}/loginMediaServices`, {
        userId,
        liveName: liveName.current.value,
      })
      const rtmpUrl = res.data
      const socket = getSocket(rtmpUrl)
      await axios({
        method: 'post',
        url: `${ENDPOINT}/startLiveEvent`,
        data: {
          userId,
        },
      })
      setTimeout(() => {
        startStreaming(canvasRef, inputStreamRef, mediaRecorderRef, socket)
        dispatch(setIsLive(true))
        setCreatingStreaming(false)
      }, 5000)
    } catch (error) {
      alert('Algo salió mal. Vuelve a intentarlo. :)')
      console.error(error)
    }
  }

  const finishLive = async (e) => {
    e.preventDefault()
    const ans = confirm('Are you sure you want to finish the LIVE?')
    if (ans) {
      try {
        await axios({
          method: 'post',
          url: `${ENDPOINT}/stopLiveEvent`,
          data: {
            userId,
          },
        })

        /* stopStreaming(mediaRecorderRef, socket) */
      } catch (error) {
        console.error(error.response)
      }
      const socket = getSocket()
      socket.off()
      mediaRecorderRef.current.stop()
      dispatch(setIsLive(false))
      router.push('/')
      return
    }
    console.log('Nothing happened')
  }
  return (
    logged && (
      <>
        <Head title='Chiper Live | En vivo' />
        {!cameraEnabled && (
          <div className='container'>
            <Loader
              type='Rings'
              color='#fa0236'
              height={100}
              width={100}
              timeout={10000} // 3 secs
            />
          </div>
        )}

        <Video videoRef={videoRef} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {!isLive && (
          <div className='container'>
            <input
              type='text'
              ref={liveName}
              placeholder='Nombre del live'
              disabled={creatingStreaming}
            />
          </div>
        )}

        {!cameraEnabled ? (
          <InfoBottom>
            <p>Habilitando camara...</p>
          </InfoBottom>
        ) : creatingStreaming ? (
          <InfoBottom>
            <p>Iniciando transmisión...</p>
          </InfoBottom>
        ) : !isLive ? (
          <ButtonBottom
            onClick={(e) => handleStartStreaming(e)}
            bgColor='#13ce66'
          >
            <p>Iniciar transmisión</p>
          </ButtonBottom>
        ) : (
          <ButtonBottom onClick={(e) => finishLive(e)} bgColor='red'>
            <p>Terminar transmisión</p>
          </ButtonBottom>
        )}

        <style jsx>
          {`
            .container {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            input {
              height: 40px;
              width: 300px;
              max-width: 75%;
              border-radius: 10px;
              padding: 0 10px;
              position: absolute;
              bottom: 90px;
              z-index: 9999;
            }
          `}
        </style>
      </>
    )
  )
}

export default Live
