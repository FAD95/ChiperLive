const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const getToken = require('../../azure/login');

router.get('/data', async (req, res) => {
    try {
        const azureToken = await getToken();
        controller.getLiveData(azureToken)
            .then(data => {
                response.success(req, res, data, 200);
            })
            .catch(err => {
                response.error(req, res, 'Internal Error', 500, err);
            })
    } catch (err) {
        response.error(req, res, 'Internal Error', 500, err);
    }
})

router.post('/data', async (req, res) => {
    const { liveEventName } = req.body;
    
    try {
        const azureToken = await getToken();
        controller.verifyLive(azureToken, liveEventName)
            .then(data => {
                response.success(req, res, data, 200);
            })
            .catch(err => {
                response.error(req, res, 'Internal Error', 500, err);
            })
    } catch (err) {
        response.error(req, res, 'Internal Error', 500, err);
    }
})

module.exports = router;