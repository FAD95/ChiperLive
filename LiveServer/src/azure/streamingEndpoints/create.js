const axios = require('axios')
const config = require('../../../config')
const getStreamingEndpoint = require('./get')

const createStreamingEndpoint = async ({ azureToken, userId }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/streamingEndpoints/${userId}?api-version=${config.azureApiVersion}&autoStart=true`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken}`,
        Connection: 'keep-alive'
      },
      data: {
        "id": null,
        "name": userId,
        "location": config.azureRegion,
        "tags": {
          "tag1": "value1",
          "tag2": "value2"
        },
        "properties": {
          "description": "test event 1",
          "scaleUnits": 1,
          "availabilitySetName": "availableset",
          "accessControl": {
            "akamai": {
              "akamaiSignatureHeaderAuthenticationKeyList": [
                {
                  "identifier": "id1",
                  "expiration": "2029-12-31T16:00:00-08:00",
                  "base64Key": "dGVzdGlkMQ=="
                },
                {
                  "identifier": "id2",
                  "expiration": "2030-12-31T16:00:00-08:00",
                  "base64Key": "dGVzdGlkMQ=="
                }
              ]
            },
            "ip": {
              "allow": [
                {
                  "name": "AllowedIp",
                  "address": "192.168.1.1"
                }
              ]
            }
          },
          "cdnEnabled": false
        }
      }
    })
      .then(async (response) => {
        let started = false
        while(!started){
          try {
            await getStreamingEndpoint({azureToken, userId})
            started = true
            console.log('Straming Endpoint created');
          } catch (error) {
            console.log('Waiting while streaming endpoint is created');
          }
        }
        console.log('Streaming Endpoint created')
        resolve(response)
      })
      .catch((error) => {
        console.log('Cant create Streaming Endpoint')
        reject(error)
      })
  })
}

module.exports = createStreamingEndpoint
