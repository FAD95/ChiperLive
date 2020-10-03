const express = require('express')
const axios = require('axios')
const config = require('../../../config')

const createMediaAsset = async (info) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaServices/${config.azureAccountName}/assets/${info.userID}Asset?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${info.token}`,
      },
      data: {
        properties: {
          description: info.liveName,
          storageAccountName: 'chiperlive',
          container: `container`,
        },
      },
    })
      .then((response) => {
        console.log('Asset created')
        resolve(response)
      })
      .catch((error) => {
        console.log('Cant create asset')
        reject(error)
      })
  })
}

module.exports = createMediaAsset
