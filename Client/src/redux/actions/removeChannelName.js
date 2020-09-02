export const type = 'REMOVE_CHANNEL_NAME'

function removeChannelName(payload = '') {
  return {
    type,
    payload,
  }
}

export default removeChannelName
