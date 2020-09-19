import { useEffect, useState, useRef } from 'react'
import Loader from 'react-loader-spinner'
import { useRouter } from 'next/router'

import Head from '../src/components/head'
import ButtonBottom from '../src/components/ButtonBottom'
import Video from '../src/components/Video'
import InfoBottom from '../src/components/InfoBottom'

import useSocket from '../src/hooks/useSocket'
import useCamera from '../src/hooks/useCamera'
import useAuth from '../src/hooks/useAuth'

import startStreaming from '../src/utils/startStreaming'
import stopStreaming from '../src/utils/stopStreaming'

import { useSelector, useDispatch } from 'react-redux'
import setIsLive from '../src/redux/actions/setIsLive'

const ENDPOINT = 'http://localhost:8080/'

function Live() {
  const [logged] = useAuth('/live')

  const isLive = useSelector((store) => store.isLive)
  const dispatch = useDispatch()

  const mediaRecorderRef = useRef()

  const [serverConnected, socket] = useSocket({ ENDPOINT })
  const [
    { inputStreamRef, videoRef, canvasRef, requestAnimationRef, cameraEnabled },
  ] = useCamera()

  useEffect(() => {
    return () => {
      dispatch(setIsLive(false))
    }
  }, [])

  const handleStartStreaming = (e) => {
    e.preventDefault()
    startStreaming(
      videoRef,
      canvasRef,
      requestAnimationRef,
      inputStreamRef,
      mediaRecorderRef,
      socket
    )
    dispatch(setIsLive(true))
  }

  const finishLive = (e) => {
    e.preventDefault()
    const ans = confirm('Are you sure you want to finish the LIVE?')
    if (ans) {
      router.push('/')
    } else {
      console.log('Nothing happened')
    }
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
              timeout={3000} // 3 secs
            />
          </div>
        )}

        <Video videoRef={videoRef} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {!serverConnected ? (
          <InfoBottom>
            <p>Conectando con el servidor...</p>
          </InfoBottom>
        ) : !cameraEnabled ? (
          <InfoBottom>
            <p>Habilitando camara...</p>
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
          `}
        </style>
      </>
    )
  )
}

export default Live
