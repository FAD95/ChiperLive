const axios = require('axios')
const config = require('../../../config')

const createLiveOutput = async ({ token, assetName, userId, liveName }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userId}/liveOutputs/${userId}Output?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: {
        properties: {
          description: liveName,
          assetName: assetName,
          archiveWindowLength: 'PT5M',
          manifestName: `${userId}manifest`,
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
