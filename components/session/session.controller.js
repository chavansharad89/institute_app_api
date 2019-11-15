const Joi = require('@hapi/joi');
const TokenService = require('../token/token.service');
const Response = require('../../utils/Response');
const Error = require('../../utils/Error');
const Validation = require('../../utils/Validation');
const Constant = require('../../utils/Constant');
const SessionService = require('./session.service');

module.exports = {
    getSessionDetailsBySessionId,
    getSessionList,
    createSession,
    editSession
};


async function createSession(req, res) {
    try {
        const [sessionDetailsToAdd, {accountId, roleName}] = await Promise.all([
            _validateSessionDetails(req.body || {}),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Constant.ROLES.INSTITUTE) {
            throw _throwPermissionDeniedError();
        }
        const result = await SessionService.createSession(accountId, sessionDetailsToAdd);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function editSession(req, res) {
    try {
        const [sessionDetailsToUpdate, {roleName}] = await Promise.all([
            _validateSessionDetails(req.body || {}),
            TokenService.getTokenDetails(req)
        ]);
        const sessionId = req.params.sessionId;
        if(roleName !== Constant.ROLES.INSTITUTE) {
            throw _throwPermissionDeniedError();
        }
        const result = await SessionService.createSession(sessionId, sessionDetailsToUpdate);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function getSessionDetailsBySessionId(req, res) {
    try {
        const [, {roleName}] = await Promise.all([
            _validateChapterId(req.params),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const result = await SessionService.deleteChapter(chapterId);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function getSessionList(req, res) {
    try {
        const {accountId, roleName} = await TokenService.getTokenDetails(req);
        console.log("accountId, roleName");
        console.log(accountId, roleName);
        const {pageId, limit} = req.params;
        const result = await SessionService.getSessionList(accountId, roleName, pageId, limit);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}


function _throwPermissionDeniedError() {
    return Utils.Error.handleError().defaultError('Permission Denied');
}


function _validateChapterId(details) {
    const validationSchema = Joi.object().keys({
        chapterId: Joi.number().integer().required()
    });

    return Validation.validate(details, validationSchema);
}


function _validateSessionDetails(details) {
    const validationSchema = Joi.object().keys({
        name: Joi.string().required(),
        streamId: Joi.number().integer().optional(),
        courseId: Joi.number().integer().required(),
        subjectId: Joi.number().integer().required(),
        name: Joi.string().required(),
        chapterId: Joi.number().integer().required(),
        startTime: Joi.date().greater('now').required(),
        endTime: Joi.date().greater('now').required(),
        description: Joi.string().optional()
    });

    return Validation.validate(details, validationSchema);
}

