export const type = 'SET_IS_LIVE'

function setIsLive (payload) {
  return {
    type,
    payload
  }
}

export default setIsLive
