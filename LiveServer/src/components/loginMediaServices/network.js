const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const response = require('../../network/response')
const axios = require('axios')
const qs = require('qs')
const createLiveEvent = require('../../azure/liveEvent/create')
const getLiveEvent = require('../../azure/liveEvent/get')
const createAsset = require('../../azure/mediaAsset/create')
const creteLiveOutput = require('../../azure/liveOutput/create')
const createStreamingLocator = require('../../azure/streamingLocator/create')
const config = require('../../../config')

router.post('/', async (req, res, next) => {
  const { userID, liveName } = req.body

  let token = ''

  try {
    const azureTokenResponse = await axios({
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

    token = azureTokenResponse.data.access_token

    if (token !== '') console.log('Logged with azure.')

    await getLiveEvent({ token, userID })

    await creteLiveOutput({
      token,
      userID,
      liveName,
    })

    const streamingLocator = await axios({
      method: 'get',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userID}?api-version=2018-07-01`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    rtmpUrl = streamingLocator.data.properties.input.endpoints[0].url + '/p'

    res.status(200).send(rtmpUrl)
  } catch (error) {
    if (error.response.status === 404) {
      try {
        await createLiveEvent({
          token,
          userID,
          liveName,
        })

        await createAsset({
          token,
          userID,
          liveName,
        })

        await creteLiveOutput({
          token,
          userID,
          liveName,
        })

        await createStreamingLocator({
          token,
          userID,
        })

        const streamingLocator = await axios({
          method: 'get',
          url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${req.body.userID}?api-version=2018-07-01`,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        rtmpUrl =
          streamingLocator.data.properties.input.endpoints[0].url + '/live'

        res.status(200).send(rtmpUrl)
      } catch (error) {
        console.error(error.response.data.error.code)
      }
    } else console.error(error.response.data.error.code)
  }
})

module.exports = router
