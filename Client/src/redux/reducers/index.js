import { combineReducers } from 'redux'
import isLive from './isLive'
import auth from './auth'
import currentUser from './currentUser'

const reducer = combineReducers({
  isLive,
  auth,
  currentUser,
})

export default reducer
