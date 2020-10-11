const axios = require('axios')
const config = require('../../../config')

const getLiveEvent = ({ azureToken, userId }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userId}/liveOutputs/${userId}?api-version=${config.azureApiVersion}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`
      }
    })
      .then((response) => {
        console.log('Live Output deleted')
        resolve(response)
      })
      .catch((error) => {
        console.error('Cant delete Live Output')
        reject(error)
      })
  })
}

module.exports = getLiveEvent
