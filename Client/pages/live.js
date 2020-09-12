import { useEffect, useState } from 'react'
import Head from '../src/components/head'
import ButtonBottom from '../src/components/ButtonBottom'
import Video from '../src/components/Video'
import InfoBottom from '../src/components/InfoBottom'
import isMobile from '../src/utils/isMobile'
import { startMaster, stopMaster } from '../src/kinesis/master'
import { connect } from 'react-redux'
import addChannelName from '../src/redux/actions/addChannelName'
import removeChannelName from '../src/redux/actions/removeChannelName'
import useCreateChannel from '../src/hooks/useCreateChannel'
import useLocalStream from '../src/hooks/useLocalStream'
import ConnectionClients from '../src/client/index'
// const formValuesExample = {
//   region: formValues.region,
//   accessKeyId: formValues.accessKeyId,
//   secretAccessKey: formValues.secretAccessKey,
//   sessionToken: formValues.sessionToken,
//   endpoint: formValues.endpoint,
//   channelName: 'Prueba1',
// }

const formValues = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACEESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  channelName: 'Prueba8',
  sendVideo: true,
  sendAudio: true,
}

function Live({ options }) {
  const connectionClient = new ConnectionClient()

  let peerConnection = null

  createStartStopButton(
    async () => {
      peerConnection = await connectionClient.createConnection(options)
      window.peerConnection = peerConnection
    },
    () => {
      peerConnection.close()
    }
  )

  return (
    <>
      <Head title='Chiper Live || En vivo' />
      <Video />
      {/* {serverConnection ? (
        <div>
          <p>conectando al servidor...</p>
        </div>
      ) : null}
      {!channelCreated ? (
        <InfoBottom>Creando el canal</InfoBottom>
      ) : !firstStart ? (
        <ButtonBottom
          width='100px'
          height='80px'
          link=''
          onClick={handleStartTransmission}
          bgcolor='#13ce66'
        >
          Iniciar transmisión
        </ButtonBottom>
      ) : !liveOn ? (
        <ButtonBottom
          bgcolor='#13ce66'
          width='100px'
          height='80px'
          link=''
          onClick={handleStartTransmission}
        >
          Reanudar transmisión
        </ButtonBottom>
      ) : (
        <ButtonBottom
          bgcolor='red'
          width='100px'
          height='80px'
          link=''
          onClick={handleStopTransmission}
        >
          Parar transmisión
        </ButtonBottom>
      )} */}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    channelName: state.channelName,
  }
}

const mapDispatchToProps = {
  addChannelName,
  removeChannelName,
}

export default connect(mapStateToProps, mapDispatchToProps)(Live)
