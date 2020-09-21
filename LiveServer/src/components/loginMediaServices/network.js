const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const response = require('../../network/response')
const axios = require('axios')
const qs = require('qs')

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
        client_id: '2d7fcae5-ddd1-4bd1-9be4-784f776a250d ',
        client_secret: 'UK.da~Y9b52~1.ndpf.5tPBLZi3tzSwjW3',
        resource: 'https://management.core.windows.net/',
      }),
    })
    res.send(azureToken.data)
  } catch (error) {
    res.status(500).send('No se pudo conectar con la nube')
    console.error(error)
  }
})

module.exports = router
