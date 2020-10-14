const createLiveOutput = require('./create')
const deleteLiveOutput = require('./delete')

const liveOutput = ({
  azureToken,
  userId,
  liveName,
  assetName
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await createLiveOutput({
        azureToken,
        userId,
        liveName,
        assetName
      })
      resolve('done')
    } catch (error) {
      if (error.response.data.error.code === 'ResourceNameTaken') {
        try {
          await deleteLiveOutput({ azureToken, userId })
          await createLiveOutput({
            azureToken,
            userId,
            liveName,
            assetName
          })
          resolve('done')
        } catch (error) {
          reject(error)
        }
      } else {
        reject(error)
      }
    }
  })
}

module.exports = liveOutput
