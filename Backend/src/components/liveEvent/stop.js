const express = require('express')
const router = express.Router()
const getToken = require('../../azure/login')
const stop = require('../../azure/liveEvent/stop')

router.post('/', async (req, res, next) => {
  const { userId } = req.body

  try {
    const azureToken = await getToken()
    setTimeout(async () => {
      await stop({ azureToken, userId })
    }, 20000);
    res.status(200).send('Live Event Stoped')
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
