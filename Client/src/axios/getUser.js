import axios from 'axios'

const ENDPOINT = process.env.SERVER

const getUser = ({ token, email }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(ENDPOINT + '/user?token=' + token + '&user=' + email)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
export default getUser
