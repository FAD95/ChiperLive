import { combineReducers } from 'redux'
import isLive from './isLive'
import auth from './auth'

const reducer = combineReducers({
  isLive,
  auth,
})

export default reducer
