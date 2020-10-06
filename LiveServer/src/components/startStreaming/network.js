const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('../../../config')
const getToken = require('../../azure/login')

router.post('/', async (req, res, next) => {
  const { userId } = req.body

  try {
    const azureToken = await getToken()

    await axios({
      method: 'post',
      url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaservices/${config.azureAccountName}/liveEvents/${userId}/start?api-version=2018-07-01`,
      headers: {
        Authorization: `Bearer ${azureToken.data.access_token}`
      }
    })

    res.status(200).send('Ya puedes transmitir')
  } catch (error) {
    console.log('error')
    console.error(error)
  }
})

module.exports = router
