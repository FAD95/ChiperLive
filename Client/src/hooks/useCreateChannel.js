import { useEffect } from 'react'
import createSignalingChannel from '../kinesis/createSignalingChannel'
import deleteSignalingChannel from '../kinesis/deleteSignalingChannel'
import { stopMaster } from '../kinesis/master'

const useCreateChannel = (
  channelName,
  addChannelName,
  removeChannelName,
  formValues
) => {
  useEffect(() => {
    if (channelName === '') {
      // callback que se llama cuando se crea el channelARN dentro de createSignalingChannel
      addChannelName(formValues.channelName)
      const callCreateSignalingChannel = async () => {
        try {
          await createSignalingChannel(formValues)
        } catch (error) {
          console.error(error)
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
