const axios = require('axios')
const config = require('../../../config')

const getLiveEvent = ({ azureToken, userId }) => {
  
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userId}?api-version=${config.azureApiVersion}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`
      }
    })
      .then((response) => {
        console.log('Live event exist')
        resolve(response)
      })
      .catch((error) => {
        console.error('Live event does not exist')
        reject(error)
      })
  })
}

module.exports = getLiveEvent
