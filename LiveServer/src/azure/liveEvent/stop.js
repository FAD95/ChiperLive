const axios = require('axios')
const config = require('../../../config')

const stopLiveEvent = ({ azureToken, userId }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userId}/stop?api-version=2018-07-01`,
      headers: {
        Authorization: `Bearer ${azureToken}`
      },
      data:{
        "removeOutputsOnStop": true
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

module.exports = stopLiveEvent

