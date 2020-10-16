import { type as SET_CURRENT_USER } from '../actions/setCurrentUser'

const defaultState = {}

const currentUser = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER: {
      return payload
    }
    default:
      return state
  }
}

export default currentUser
