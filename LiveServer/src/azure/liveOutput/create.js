const axios = require('axios')
const config = require('../../../config')

const createLiveOutput = async ({ azureToken, assetName, userId, liveName }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userId}/liveOutputs/${userId}?api-version=${config.azureApiVersion}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`
      },
      data: {
        properties: {
          description: liveName,
          assetName: assetName,
          archiveWindowLength: 'PT5M',
          manifestName: `${userId}`,
          hls: {
            fragmentsPerTsSegment: 1
          }
        }
      }
    })
      .then((response) => {
        console.log('LiveOutput created')
        resolve(response)
      })
      .catch((error) => {
        console.error('Cant create LiveOutput')
        reject(error)
      })
  })
}

module.exports = createLiveOutput
