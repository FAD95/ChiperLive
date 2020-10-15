const express = require('express')
const router = express.Router()
const liveEvent = require('../../azure/liveEvent/')
const liveOutput = require('../../azure/liveOutput/')
const streamingLocator = require('../../azure/streamingLocator/')
const getLiveEvent = require('../../azure/liveEvent/get')
const createAsset = require('../../azure/mediaAsset/create')
const getToken = require('../../azure/login')

router.post('/', async (req, res, next) => {
  const { userId, liveName } = req.body

  let azureToken = ''

  try {
    azureToken = await getToken()
  } catch (error) {
    console.log({ error })
    res.status(500).send('Internal error')
  }
  if (azureToken !== '') {
    try {
      await liveEvent({ azureToken, userId, liveName })
      const assetName = await createAsset({
        azureToken,
        userId,
        liveName,
      })

      await liveOutput({
        azureToken,
        userId,
        liveName,
        assetName,
      })

      await streamingLocator({
        azureToken,
        userId,
        assetName,
      })
      const actualStreamingLocator = await getLiveEvent({ azureToken, userId })
      const rtmpUrl =
        actualStreamingLocator.data.properties.input.endpoints[0].url + '/live'

      res.status(200).send(rtmpUrl)
    } catch (error) {
      next(error)
      console.error(error.response.data)
      res.status(500).send('Internal error')
    }
  }
})

module.exports = router
