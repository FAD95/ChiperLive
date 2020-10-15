const axios = require('axios')
const config = require('../../../config')

const getStreamingLocators = async (azureToken) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://management.azure.com/subscriptions/${config.azureSubscriptionId}/resourceGroups/${config.azureResourceGroupName}/providers/Microsoft.Media/mediaServices/${config.azureAccountName}/streamingLocators?api-version=${config.azureApiVersion}`,
            headers: {
                'Authorization': `Bearer ${azureToken}`
            }
        })
        .then(response => {
            resolve(response);
        })
        .catch(err => {
            reject(err)
        })
    })
}

module.exports = getStreamingLocators