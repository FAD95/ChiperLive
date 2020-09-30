const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const response = require('../../network/response')
const axios = require('axios')
const qs = require('qs')
const config = require('../../../config')

const currentLives = {}

const createStreamingPolicy = async (info) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaServices/${config.azureAccountName}/streamingPolicies/${info.userID}StreamingPolicy?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${info.token}`,
      },
      data: {
        properties: {
          noEncryption: {
            enabledProtocols: {
              download: true,
              dash: true,
              hls: true,
              smoothStreaming: true,
            },
          },
        },
      },
    })
      .then((response) => {
        console.log('Asset created')
        resolve(response)
      })
      .catch((err) => {
        console.error('Cant create asset')
        reject(err)
      })
  })
}

module.exports = createStreamingPolicy
