export const GET_LOGIN = Symbol('GET_LOGIN')
export const GET_LOGIN_SUCCESS = Symbol('GET_LOGIN_SUCCESS')

export function getLogin () {
  return dispatch => {
    dispatch({
      type: GET_LOGIN
    })

    return (
      // Llamada a API o accion y luego el dispatch
      setTimeout(() => {
        dispatch(onGetLogin(true))
      }, 2000)
    )
  }
}

function onGetLogin (value) {
  return {
    type: GET_LOGIN_SUCCESS,
    value
  }
}
