const axios = require('axios')
const config = require('../../../config')

const createStreamingLocator = async ({ token, userId, assetName }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaServices/${config.azureAccountName}/streamingLocators/${userId}StreamingLocator?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
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
