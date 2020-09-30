const express = require('express')
const axios = require('axios')
const config = require('../../../config')

const currentLives = {}

const createLiveEvent = async (info) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${info.userID}?api-version=2018-07-01&autoStart=false`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${info.token}`,
      },
      data: {
        location: 'southcentralus',
        properties: {
          description: info.liveName,
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
                    subnetPrefixLength: 0,
                  },
                ],
              },
            },
          },
          preview: {
            accessControl: {
              ip: {
                allow: [
                  {
                    name: 'AllowAll',
                    address: '0.0.0.0',
                    subnetPrefixLength: 0,
                  },
                ],
              },
            },
          },
          encoding: {
            encodingType: 'Standard',
            presetName: '',
          },
        },
      },
    })
      .then((response) => {
        console.log('Live event created')
        resolve(response)
      })
      .catch((err) => {
        console.error('Cant create a live event')
        reject(err)
      })
  })
}

module.exports = createLiveEvent
