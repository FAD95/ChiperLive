const axios = require('axios')
const config = require('../../../config')

const createStreamingLocator = async ({ azureToken, userId, assetName }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaServices/${config.azureAccountName}/streamingLocators/${userId}?api-version=${config.azureApiVersion}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`
      },
      data: {
        properties: {
          streamingPolicyName: config.azureStreamingPolicyName,
          assetName: assetName,
          contentKeys: [],
          filters: []
        }
      }
    })
      .then((response) => {
        console.log('Streaming locator created')
        resolve(response)
      })
      .catch((error) => {
        console.log('Cant create streaming locator')
        reject(error)
      })
  })
}

module.exports = createStreamingLocator
