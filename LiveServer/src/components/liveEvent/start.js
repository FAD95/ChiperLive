const express = require('express')
const router = express.Router()
const getToken = require('../../azure/login')
const startLiveEvent = require('../../azure/liveEvent/start')

router.post('/', async (req, res, next) => {
  const { userId } = req.body

  try {
    const azureToken = await getToken()
    await startLiveEvent({ azureToken, userId })
    res.status(200).send('Ya puedes transmitir')
  } catch (error) {
    console.error(error.response)
  }
})

module.exports = router
