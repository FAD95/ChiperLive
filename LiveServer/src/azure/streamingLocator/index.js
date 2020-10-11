const createStreamingLocator = require('../../azure/streamingLocator/create')
const deleteStreamingLocator = require('../../azure/streamingLocator/delete')

const streamingLocator = ({
  azureToken,
  userId,
  assetName
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await createStreamingLocator({ azureToken, userId, assetName })
      resolve('done')
    } catch (error) {
      if (error.response.data.error.code === 'BadRequest') {
        try {
          await deleteStreamingLocator({ azureToken, userId })
          await createStreamingLocator({ azureToken, userId, assetName })
        } catch (error) {
          reject(error)
        }
        resolve('done')
      } else {
        reject(error)
      }
    }
  })
}

module.exports = streamingLocator
