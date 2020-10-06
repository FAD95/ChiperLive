import { useEffect, useRef, useState } from 'react'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import { useRouter } from 'next/router'

import Head from '../src/components/head'
import ButtonBottom from '../src/components/ButtonBottom'
import Video from '../src/components/Video'
import InfoBottom from '../src/components/InfoBottom'

import useCamera from '../src/hooks/useCamera'
import useAuth from '../src/hooks/useAuth'

import startStreaming from '../src/utils/startStreaming'
import stopStreaming from '../src/utils/stopStreaming'

import { useSelector, useDispatch } from 'react-redux'
import setIsLive from '../src/redux/actions/setIsLive'

const ENDPOINT = process.env.LIVE_SERVER

function Live () {
  const liveName = useRef()
  const mediaRecorderRef = useRef()

  const [rtmpUrl, setRtmpUrl] = useState('')

  const [logged] = useAuth('/live')

  const [{ inputStreamRef, videoRef, canvasRef, cameraEnabled }] = useCamera()

  const router = useRouter()

  const isLive = useSelector((store) => store.isLive)
  const userId = useSelector((store) => store.currentUser._id)

  const dispatch = useDispatch()

  useEffect(() => {
    return async () => {
      try {
        // Delete streamingLocator
        await axios({
          method: 'DELETE',
          url: `https://management.azure.com/subscriptions/3a88a26f-cfc6-4bb8-a08b-8204c3a3f0af/resourceGroups/chiperlive/providers/Microsoft.Media/mediaServices/chiperlive/streamingLocators/${userID}StreamingLocator?api-version=2018-07-01`,
          data: {
            Authorization: `Bearer ${azureToken}`
          }
        })

        // Delete liveOutput
        await axios({
          method: 'DELETE',
          url: `https://management.azure.com/subscriptions/3a88a26f-cfc6-4bb8-a08b-8204c3a3f0af/resourceGroups/chiperlive/providers/Microsoft.Media/mediaservices/chiperlive/liveEvents/${userID}/liveOutputs/${userID}Output?api-version=2018-07-01`,
          data: {
            Authorization: `Bearer ${azureToken}`
          }
        })

        // Delete asset
        await axios({
          method: 'DELETE',
          url: `https://management.azure.com/subscriptions/3a88a26f-cfc6-4bb8-a08b-8204c3a3f0af/resourceGroups/chiperlive/providers/Microsoft.Media/mediaServices/chiperlive/assets/${userID}Asset?api-version=2018-07-01`,
          data: {
            Authorization: `Bearer ${azureToken}`
          }
        })

        // Delete liveEvent
        await axios({
          method: 'DELETE',
          url: `https://management.azure.com/subscriptions/3a88a26f-cfc6-4bb8-a08b-8204c3a3f0af/resourceGroups/chiperlive/providers/Microsoft.Media/mediaservices/chiperlive/liveEvents/${userID}?api-version=2018-07-01`,
          data: {
            Authorization: `Bearer ${azureToken}`
          }
        })
      } catch (error) {}
      dispatch(setIsLive(false))
    }
  }, [])

  const handleStartStreaming = async (e) => {
    e.preventDefault()
    if (!liveName.current.value) {
      alert('Debe asignarle un nombre al live')
      return
    }
    try {
      const res = await axios.post(ENDPOINT + '/loginMediaServices', {
        userId,
        liveName: liveName.current.value
      })
      console.log(res.data)
      setRtmpUrl(res.data)
    } catch (error) {
      console.error(error)
    }
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

  const handlePlay = async (e) => {
    e.preventDefault()

    try {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:8080/startStreaming',
        data: {
          userId
        }
      })
      console.log(res)
      startStreaming(canvasRef, inputStreamRef, mediaRecorderRef, rtmpUrl)
      dispatch(setIsLive(true))
    } catch (error) {
      console.error(error.response)
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

        <input type='text' ref={liveName} />

        <button onClick={(e) => handlePlay(e)}>
          Iniciar transmison en azure
        </button>

        {!cameraEnabled ? (
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
