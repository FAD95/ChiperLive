import Immutable from 'immutable'
import * as ActionType from 'actions/repos'

export const initialState = Immutable.fromJS({
  isLoading: false,
  value: false
})

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.GET_LOGIN:
      return state.set('isLoading', true)

    case ActionType.GET_LOGIN_SUCCESS:
      return state.merge(
        Object.assign({}, {
          isLoading: false,
          value: action.value
        })
      )

    default:
      return state
  }
}
