const axios = require('axios')
const config = require('../../../config')

const createMediaAsset = async ({ azureToken, liveName, userId }) => {
  const d = new Date()
  const date = d.toLocaleDateString() + '-' + d.getTime()
  let assetName = userId + '-' + date

  while (assetName.includes('/')) {
    assetName = assetName.replace('/', '-')
  }
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaServices/${config.azureAccountName}/assets/${assetName}?api-version=${config.azureApiVersion}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`,
      },
      data: {
        properties: {
          description: liveName,
          storageAccountName: config.azureStorageAccountName,
          container: assetName,
        },
      },
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
