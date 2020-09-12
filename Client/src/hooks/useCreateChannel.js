import { useEffect } from 'react'
import createSignalingChannel from '../kinesis/createSignalingChannel'
import deleteSignalingChannel from '../kinesis/deleteSignalingChannel'
import { stopMaster } from '../kinesis/master'

const useCreateChannel = async (
  channelName,
  formValues,
  addChannelName,
  removeChannelName,
  setChannelCreated
) => {
  useEffect(() => {
    if (channelName === '') {
      addChannelName(formValues.channelName)
      const callCreateSignalingChannel = async () => {
        try {
          await createSignalingChannel(formValues)
          setChannelCreated(true)
        } catch (error) {
          console.error(error)
          setChannelCreated(true)
          console.log('The channel already exists')
        }
      }
      callCreateSignalingChannel()
    }
    return () => {
      if (channelName !== '') {
        alert('Se parara la transmision')
        stopMaster()
        deleteSignalingChannel(channelName)
        removeChannelName()
        console.log('Channel deleted')
      }
    }
  }, [channelName])
}

export default useCreateChannel
