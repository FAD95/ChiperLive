const axios = require('axios')
const config = require('../../../config')

const listPaths = async (azureToken, streamingLocatorName) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaServices/${config.azureAccountName}/streamingLocators/${streamingLocatorName}/listPaths?api-version=${config.azureApiVersion}`,
            headers: {
                'Authorization': `Bearer ${azureToken}`
            }
        })
        .then(response => {
            resolve(response)
        })
        .catch(err => {
            reject(err)
        })
    })
}

module.exports = listPaths