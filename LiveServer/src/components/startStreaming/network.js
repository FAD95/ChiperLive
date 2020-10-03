const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('../../../config')
const qs = require('qs')

const getToken = async () => {
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
    return azureToken
  } catch (error) {
    console.error(error)
  }
}

router.post('/', async (req, res, next) => {
  let { userID } = req.body

  try {
    const azureToken = await getToken()

    await axios({
      method: 'post',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userID}/start?api-version=2018-07-01`,
      headers: {
        Authorization: `Bearer ${azureToken.data.access_token}`,
      },
    })

    res.status(200).send('Ya puedes transmitir')
  } catch (error) {
    console.log('error')
    console.error(error)
  }
})

module.exports = router
