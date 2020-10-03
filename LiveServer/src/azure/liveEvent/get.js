const express = require('express')
const axios = require('axios')
const config = require('../../../config')

const getLiveEvent = (info) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${info.userID}?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${info.token}`,
      },
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
