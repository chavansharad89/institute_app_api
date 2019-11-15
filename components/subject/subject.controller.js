const Joi = require('@hapi/joi');
const TokenService = require('../token/token.service');
const SubjectService = require('./subject.service');

const Response = require('../../utils/Response');
const Error = require('../../utils/Error');
const Constant = require('../../utils/Constant');
const Validation = require('../../utils/Validation');

module.exports = {
    deleteSubject,
    addSubject,
    updateSubject
};


async function addSubject(req, res) {
    try {
        const [subjectDetailsToAdd, {roleName}] = await Promise.all([
            _validateSubjectDetails(req.body || {}),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        
        const result = await SubjectService.addSubject(subjectDetailsToAdd);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function updateSubject(req, res) {
    try {
        const [, {roleName}] = await Promise.all([
            _validateSubjectDetails(req.params),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Utils.Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const result = await SubjectService.addSubject(subjectId, name, streamId, subjectId);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function deleteSubject(req, res) {
    try {
        const [, {roleName}] = await Promise.all([
            _validateSubjectId(req.params),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Utils.Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const result = await SubjectService.deleteSubject(accountId, subjectId);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}


function _throwPermissionDeniedError() {
    return Utils.Error.handleError().defaultError('Permission Denied');
}


function _validateSubjectId(details) {
    const validationSchema = Joi.object().keys({
        subjectId: Joi.number().integer().required()
    });

    return Validation.validate(details, validationSchema);
}


function _validateSubjectDetails(details) {
    const validationSchema = Joi.object().keys({
        subjectId: Joi.number().integer().optional(),
        name: Joi.string().required(),
        streamId: Joi.number().integer().optional(),
        courseId: Joi.number().integer().required()
    });

    return Validation.validate(details, validationSchema);
}

