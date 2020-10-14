const axios = require('axios')
const config = require('../../../config')

const getStreamingEndpoint = ({ azureToken, userId }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/streamingEndpoints/${userId}?api-version=${config.azureApiVersion}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`
      }
    })
      .then((response) => {
        console.log('Streaming endpoint exist')
        resolve(response)
      })
      .catch((error) => {
        console.error('Streaming endpoint does not exist')
        reject(error)
      })
  })
}

module.exports = getStreamingEndpoint
