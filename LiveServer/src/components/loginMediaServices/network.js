const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const response = require('../../network/response')
const axios = require('axios')
const qs = require('qs')
const createLiveEvent = require('../../azure/liveEvent/create')
const createAsset = require('../../azure/mediaAsset/create')
const creteLiveOutput = require('../../azure/liveOutput/create')
const createStreamingLocator = require('../../azure/streamingLocator/create')
const config = require('../../../config')

router.post('/', async (req, res, next) => {
  try {
    const azureToken = await axios({
      method: 'post',
      url: 'https://login.microsoftonline.com/uniminuto.edu/oauth2/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'client_credentials',
        client_id: config.azureClientId,
        client_secret: config.azureClientSecret,
        resource: 'https://management.core.windows.net/',
      }),
    })

    if (azureToken.data.access_token) console.log('Logged with azure.')
    console.log(req.body)

    await createLiveEvent({
      token: azureToken.data.access_token,
      userID: req.body.userID,
      liveName: req.body.liveName,
    })

    await createAsset({
      token: azureToken.data.access_token,
      userID: req.body.userID,
      liveName: req.body.liveName,
    })

    await creteLiveOutput({
      token: azureToken.data.access_token,
      userID: req.body.userID,
      liveName: req.body.liveName,
    })

    await createStreamingLocator({
      token: azureToken.data.access_token,
      userID: req.body.userID,
    })

    const streamingLocator = await axios({
      method: 'get',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${req.body.userID}?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${azureToken.data.access_token}`,
      },
    })

    const RTMP = streamingLocator.data.properties.input.endpoints[0].url

    res.send('done!')
  } catch (error) {
    res.status(500).send('Ocurrio un error inesperado.')
    next(error)
  }
})

module.exports = router
