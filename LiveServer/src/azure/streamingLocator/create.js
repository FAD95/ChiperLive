const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const response = require('../../network/response')
const axios = require('axios')
const qs = require('qs')
const config = require('../../../config')

const createStreamingLocator = async (info) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaServices/${config.azureAccountName}/streamingLocators/${info.userID}StreamingLocator?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${info.token}`,
      },
      data: {
        properties: {
          streamingPolicyName: 'streamingPolicy3',
          assetName: `${info.userID}Asset`,
          contentKeys: [],
          filters: [],
        },
      },
    })
      .then((response) => {
        console.log('Streaming locator created')
        resolve(response)
      })
      .catch((err) => {
        console.error('Cant create streaming locator')
        reject(err)
      })
  })
}

module.exports = createStreamingLocator
