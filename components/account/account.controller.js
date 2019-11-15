const Joi = require('@hapi/joi');
const TokenService = require('../token/token.service');
const HeaderService = require('../header/header.service');
const AccountService = require('./account.service');

const Response = require('../../utils/Response');
const Error = require('../../utils/Error');
const Validation = require('../../utils/Validation');

module.exports = {
    mobileLogin,
    mobileLogout
};

async function mobileLogin(req, res) {
    try {
        const {user, password} = await _validateMobileLogin(req.body || {});
        const result = await AccountService.login(user, password);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function mobileLogout(req, res) {
    try {
        await _validateMobileSignOut(req.body);
        const deviceToken = req.body && req.body.device_token && req.body.device_token.trim() !== '' ? req.body.device_token : null;
        const token = await HeaderService.getJwt(req);
        const {access_key: accessKey, vendor_id: vendorId} = await TokenService.getTokenDetails(req);
        const result = await UserService.mobileSignOut(vendorId, accessKey, token, deviceToken);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}


function _validateMobileLogin(details) {
    const validationSchema = Joi.object().keys({
        user: Joi.string().trim().max(100).required(),
        password: Joi.string().trim().min(4).max(20).required()
    });

    return Validation.validate(details, validationSchema);
}

function _validateMobileSignOut(details) {
    const validationSchema = {
        device_token: Joi.string().allow(null).allow('').optional()
    };
    return Validation.validate(details, validationSchema);
}
