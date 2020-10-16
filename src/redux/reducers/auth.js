import { type as SET_AUTH } from '../actions/setAuth'

const defaultState = {
  status: false,
  token: '',
  userID: ''
}

const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_AUTH: {
      return payload
    }
    default:
      return state
  }
}

export default auth
