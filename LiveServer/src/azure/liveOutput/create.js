const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const response = require('../../network/response')
const axios = require('axios')
const qs = require('qs')
const config = require('../../../config')

const currentLives = {}

const createLiveOutput = async (info) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${info.userID}/liveOutputs/${info.userID}Output?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${info.token}`,
      },
      data: {
        properties: {
          description: info.liveName,
          assetName: `${info.userID}Asset`,
          archiveWindowLength: 'PT5M',
          manifestName: `${info.userID}manifest`,
          hls: {
            fragmentsPerTsSegment: 1,
          },
        },
      },
    })
      .then((response) => {
        console.log('LiveOutput created')
        resolve(response)
      })
      .catch((err) => {
        console.error('Cant create LiveOutput')
        reject(err)
      })
  })
}

module.exports = createLiveOutput
