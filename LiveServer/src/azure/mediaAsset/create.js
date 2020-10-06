const axios = require('axios')
const config = require('../../../config')

const createMediaAsset = async ({ token, liveName, userId }) => {
  const d = new Date()
  const date = d.toLocaleDateString() + '-' + d.getTime()
  const assetName = userId + '-' + date
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaServices/${config.azureAccountName}/assets/${assetName}?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: {
        properties: {
          description: liveName,
          storageAccountName: config.azureStorageAccountName,
          container: assetName
        }
      }
    })
      .then(() => {
        console.log('Asset created')
        resolve(assetName)
      })
      .catch((error) => {
        console.log('Cant create asset')
        reject(error)
      })
  })
}

module.exports = createMediaAsset
