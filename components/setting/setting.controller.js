
const Response = require('../../utils/Response');
const Error = require('../../utils/Error');
const SettingService = require('./setting.service');

module.exports = {
    getMobileSettings
};

async function getMobileSettings(req, res) {
    try {
        const result = await SettingService.getMobileSettings();
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}