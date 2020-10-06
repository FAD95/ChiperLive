const axios = require('axios')
const config = require('../../../config')

const getLiveEvent = ({ token, userId }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userId}?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
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
