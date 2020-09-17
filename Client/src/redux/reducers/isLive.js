// Con esto aseguramos que el type del action no se repita
import { type as SET_IS_LIVE } from '../actions/setIsLive'

const defaultState = false

const channelName = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_IS_LIVE: {
      return payload
    }
    default:
      return state
  }
}

export default channelName
