export const type = 'SET_CURRENT_USER'

function setCurrentUser (payload) {
  return {
    type,
    payload
  }
}

export default setCurrentUser
