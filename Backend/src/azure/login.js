const axios = require('axios')
const config = require('../../config')
const qs = require('qs')

const login = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `https://login.microsoftonline.com/${config.azureTenantId}/oauth2/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Keep-Alive': true
      },
      data: qs.stringify({
        grant_type: 'client_credentials',
        client_id: config.azureClientId,
        client_secret: config.azureClientSecret,
        resource: 'https://management.core.windows.net/'
      })
    })
      .then((response) => {
        console.log('Logged with azure.')
        resolve(response.data.access_token)
      })
      .catch((err) => {
        console.error('Cant signIn in azure')
        reject(err)
      })
  })
}

module.exports = login
