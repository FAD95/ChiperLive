// Con esto aseguramos que el type del action no se repita
import { type as ADD_CHANNEL_NAME } from '../actions/addChannelName'
import { type as REMOVE_CHANNEL_NAME } from '../actions/removeChannelName'

const defaultState = ''

const channelName = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ADD_CHANNEL_NAME: {
      return payload
    }
    case REMOVE_CHANNEL_NAME: {
      return payload
    }
    default:
      return state
  }
}

export default channelName
