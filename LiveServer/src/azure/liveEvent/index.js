const createLiveEvent = require('./create')
const getLiveEvent = require('./get')

const liveEvent = ({ azureToken, userId, liveName }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await getLiveEvent({ azureToken, userId })
      resolve('done')
    } catch (error) {
      if (error.response.data.error.code === 'ResourceNotFound') {
        try {
          await createLiveEvent({ azureToken, userId, liveName })
          let liveEventExist = false
          while (!liveEventExist) {
              try {
                await getLiveEvent({azureToken, userId})
                liveEventExist = true
                resolve('done')     
              } catch (error) { 
              }
          }
        } catch (error) {
          reject(error)
        }
      } else {
        reject(error)
      }
    }
  })
}
module.exports = liveEvent
