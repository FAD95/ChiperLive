const axios = require('axios')
const config = require('../../../config')

const getStreamingLocator = ({ azureToken, userId }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/streamingLocators/${userId}?api-version=${config.azureApiVersion}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`
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

module.exports = getStreamingLocator
