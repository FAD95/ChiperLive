const express = require('express')
const router = express.Router()
const createLiveEvent = require('../../azure/liveEvent/create')
const getLiveEvent = require('../../azure/liveEvent/get')
const createAsset = require('../../azure/mediaAsset/create')
const createLiveOutput = require('../../azure/liveOutput/create')
const getLiveOutput = require('../../azure/liveOutput/get')
const createStreamingLocator = require('../../azure/streamingLocator/create')
const getStreamingLocator = require('../../azure/streamingLocator/get')
const getToken = require('../../azure/login')

const basicAzureCalls = ({ token, userId, liveName }) => {
  return new Promise(async (resolve, reject) => {
    let assetName = null
    try {
      assetName = await createAsset({
        token,
        userId,
        liveName
      })

      if(assetName){
        try {          
          await createLiveOutput({
            token,
            userId,
            liveName,
            assetName
          })
        } catch (error) {
            if(error.response.data.error.code==='ResourceNameTaken'){
              // Delete LiveOutput
              // Create LiveOutput
            }else{
              console.error(error.response.data);
            }
        }
      }
      await createStreamingLocator({
        token,
        userId,
        assetName
      })

      const streamingLocator = await getStreamingLocator({ token, userId })
      const rtmpUrl =
              streamingLocator.data.properties.input.endpoints[0].url + '/live'

      resolve(rtmpUrl)
    } catch (error) {
      reject(error)
    }
  })
}

router.post('/', async (req, res, next) => {
  const { userId, liveName } = req.body

  let token = ''

  try {
    const azureToken = await getToken()
    token = azureToken.data.access_token
  } catch (error) {
    console.log({ error })

    res.status(404).send(error)
  }
  if (token !== '') {
    let liveEvent = null
    try {
      liveEvent = await getLiveEvent({ token, userId })
      let rtmpUrl
      try {
        rtmpUrl = await basicAzureCalls({ token, userId, liveName })
      } catch (error) {
        console.error(error.response.data)
        res.status(500)
      }
      res.status(200).send(rtmpUrl)
      return
    } catch (error) {
      if (error.response.data.status === 404) {
        try {
          liveEvent = await createLiveEvent({ token, userId, liveName })
          let rtmpUrl
          try {
            rtmpUrl = await basicAzureCalls({ token, userId, liveName })
          } catch (error) {
            console.error(error.response.data)
            res.status(500)         
          }
          res.status(200).send(rtmpUrl)
        } catch (error) {
          console.error(error.response.data)
        }
      } else {
        console.error(error.response.data)
        res.status(500)
      }
    }
  }
})

module.exports = router
