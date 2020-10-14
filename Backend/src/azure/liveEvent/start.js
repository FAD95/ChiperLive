const axios = require('axios')
const config = require('../../../config')

const startLiveEvent = ({ azureToken, userId }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userId}/start?api-version=2018-07-01`,
      headers: {
        Authorization: `Bearer ${azureToken}`
      }
    })
      .then((response) => {
        console.log('Live event started')
        resolve(response)
      })
      .catch((error) => {
        console.error('Live event cant start')
        reject(error)
      })
  })
}

module.exports = startLiveEvent
