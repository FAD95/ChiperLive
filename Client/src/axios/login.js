import axios from 'axios'

const ENDPOINT = process.env.SERVER

const Login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(ENDPOINT + '/login', {
        email,
        password
      })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 401) {
            reject('E-mail o contraseña incorrectos')
          }
        }
        reject(error)
      })
  })
}
export default Login
