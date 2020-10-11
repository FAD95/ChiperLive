const axios = require('axios')
const config = require('../../../config')

const getStreamingEndpoint = ({ azureToken, userId }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/streamingEndpoints/${userId}StreamingEndpoint?api-version=${config.azureApiVersion}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`,
        Connection: 'keep-alive'
      }
    })
      .then((response) => {
        console.log('Streaming Locator deleted')
        resolve(response)
      })
      .catch((error) => {
        console.error('Cant delete Streaming Locator')
        reject(error)
      })
  })
}

module.exports = getStreamingEndpoint
