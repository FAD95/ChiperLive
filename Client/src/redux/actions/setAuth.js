export const type = 'SET_AUTH'

function setAuth (payload) {
  return {
    type,
    payload
  }
}

export default setAuth
