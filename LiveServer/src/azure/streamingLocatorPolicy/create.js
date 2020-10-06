const axios = require('axios')
const config = require('../../../config')

const createStreamingPolicy = async ({ token }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaServices/${config.azureAccountName}/streamingPolicies/ChiperLiveStreamingPolicy?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: {
        properties: {
          noEncryption: {
            enabledProtocols: {
              download: true,
              dash: true,
              hls: true,
              smoothStreaming: true
            }
          }
        }
      }
    })
      .then((response) => {
        console.log('Asset created')
        resolve(response)
      })
      .catch((err) => {
        console.error('Cant create asset')
        reject(err)
      })
  })
}

module.exports = createStreamingPolicy
