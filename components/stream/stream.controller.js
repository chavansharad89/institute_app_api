const Joi = require('@hapi/joi');
const TokenService = require('../token/token.service');
const Response = require('../../utils/Response');
const Error = require('../../utils/Error');
const Validation = require('../../utils/Validation');

module.exports = {
    deleteStream,
    addStream,
    updateStream
};


async function addStream(req, res) {
    try {
        const [, {roleName}] = await Promise.all([
            _validateStreamDetails(req.params),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Utils.Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const result = await StreamService.addStream(name);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function updateStream(req, res) {
    try {
        const [, {roleName}] = await Promise.all([
            _validateStreamDetails(req.params),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Utils.Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const result = await StreamService.addStream(streamId, name);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function deleteStream(req, res) {
    try {
        const [, {roleName}] = await Promise.all([
            _validateStreamId(req.params),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Utils.Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const result = await StreamService.deleteStream(StreamId);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}


function _throwPermissionDeniedError() {
    return Utils.Error.handleError().defaultError('Permission Denied');
}


function _validateStreamId(details) {
    const validationSchema = Joi.object().keys({
        streamId: Joi.number().integer().required()
    });

    return Validation.validate(details, validationSchema);
}


function _validateStreamDetails(details) {
    const validationSchema = Joi.object().keys({
        streamId: Joi.number().integer().optional(),
        name: Joi.string().required()
    });

    return Validation.validate(details, validationSchema);
}

