const axios = require('axios')
const config = require('../../../config')

const createLiveEvent = ({ azureToken, userId, liveName }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userId}?api-version=${config.azureApiVersion}&autoStart=false`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`
      },
      data: {
        location: config.azureRegion,
        properties: {
          description: liveName,
          vanityUrl: true,
          streamOptions: ['LowLatency'],
          input: {
            streamingProtocol: 'RTMP',
            accessToken: config.azureSubscriptionId,
            keyFrameIntervalDuration: 'PT2S',
            accessControl: {
              ip: {
                allow: [
                  {
                    name: 'AllowAll',
                    address: '0.0.0.0',
                    subnetPrefixLength: 0
                  }
                ]
              }
            }
          },
          preview: {
            accessControl: {
              ip: {
                allow: [
                  {
                    name: 'AllowAll',
                    address: '0.0.0.0',
                    subnetPrefixLength: 0
                  }
                ]
              }
            }
          },
          encoding: {
            encodingType: 'Standard',
            presetName: ''
          }
        }
      }
    })
      .then((response) => {
        console.log('Live event created')
        resolve(response)
      })
      .catch((error) => {
        console.error('Cant create a live event')
        reject(error)
      })
  })
}

module.exports = createLiveEvent
