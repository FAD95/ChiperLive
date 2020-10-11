const axios = require('axios')
const config = require('../../../config')

const stopStreamingEndpoint = ({ azureToken, userId }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',

      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/streamingEndpoints/${userId}StreamingEndpoint/stop?api-version=${config.azureApiVersion}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`,
        Connection: 'keep-alive'
      }
    })
      .then((response) => {
        console.log('Streaming Endpoint deleted')
        resolve(response)
      })
      .catch((error) => {
        console.error('Cant delete Streaming Endpoint')
        reject(error)
      })
  })
}

module.exports = stopStreamingEndpoint
