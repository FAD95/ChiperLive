import { useState } from 'react'
import Head from '../src/components/head'
import Button from '../src/components/Button'
import Video from '../src/components/Video'
import { startMaster, stopMaster } from '../src/kinesis/master'
import { connect } from 'react-redux'
import addChannelName from '../src/redux/actions/addChannelName'
import removeChannelName from '../src/redux/actions/removeChannelName'
import useLiveStream from '../src/hooks/useLiveStream'
import useLocalStream from '../src/hooks/useLocalStream'

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

function Live({ channelName, addChannelName, removeChannelName }) {
  useLocalStream()
  useLiveStream(channelName, addChannelName, removeChannelName, formValues)
  function onStatsReport(report) {
    // TODO: Publish stats
  }

  const handleStopTransmission = async (e) => {
    e.preventDefault()
    stopMaster()
  }
  const handleStartTransmission = async (e) => {
    e.preventDefault()
    startMaster(formValues, onStatsReport, (event) => {
      remoteMessage.append(`${event.data}\n`)
    })
  }

  return (
    <>
      <Head title="Chiper Live || En vivo" />
      <Video />
      <Button
        width="100px"
        height="80px"
        link=""
        onClick={handleStopTransmission}
      >
        Parar transmisión
      </Button>
      <Button
        width="100px"
        height="80px"
        link=""
        onClick={handleStartTransmission}
      >
        Reanudar transmisión
      </Button>
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
