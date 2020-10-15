const getStreamingLocators = require('../../azure/streamingLocator/get');
const listPaths = require('../../azure/listPaths/get');
const getLiveEvent = require('../../azure/liveEvent/get');

const getLiveData = async azureToken => {
    return new Promise(async (resolve, reject) => {
        const lives = [];

        try {
            const streamingLocators = await getStreamingLocators(azureToken);
            console.log(streamingLocators.data);

            await Promise.all(
                streamingLocators.data.value.map(async streamingLocator => {
                    const paths = await listPaths(azureToken, streamingLocator.name);
                    const path = paths.data.streamingPaths[0].paths[0];

                    lives.push({ id: streamingLocator.name, url: path, autor: 'Alejandro' });
                })
            )

            resolve(lives);
        } catch (err) {
            reject(err);
        }
    })
}

const verifyLive = (azureToken, userId) => {
    return new Promise (async (resolve, reject) => {
        if(!userId) {
            reject('Incomplete data');
            return;
        }
        
        try {
            const liveEvent = await getLiveEvent({ azureToken, userId});

            if(liveEvent.data.properties.resourceState === 'Running') {
                resolve('Live found');
            } else {
                reject('Live not found');
            }
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    getLiveData,
    verifyLive
}