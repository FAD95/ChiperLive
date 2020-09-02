export const type = 'ADD_CHANNEL_NAME'

function addChannelName(channelName) {
  return {
    type,
    payload: channelName,
  }
}

export default addChannelName
