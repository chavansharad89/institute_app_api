const Joi = require('@hapi/joi');
const TokenService = require('../token/token.service');
const Response = require('../../utils/Response');
const Error = require('../../utils/Error');
const Validation = require('../../utils/Validation');
const Constant = require('../../utils/Constant');
const ChapterService = require('./chapter.service');

module.exports = {
    addChapter,
    deleteChapter
};


async function addChapter(req, res) {
    try {
        const [chapterDataToAdd, {roleName}] = await Promise.all([
            _validateChapterDetails(req.body || {}),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const {name, subjectId, courseId} = chapterDataToAdd;
        const result = await ChapterService.addChapter(name, subjectId, courseId);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function deleteChapter(req, res) {
    try {
        const [, {roleName}] = await Promise.all([
            _validateChapterId(req.params),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Utils.Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const result = await ChapterService.deleteChapter(chapterId);
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


function _validateChapterDetails(details) {
    const validationSchema = Joi.object().keys({
        courseId: Joi.number().integer().required(),
        subjectId: Joi.number().integer().required(),
        name: Joi.string().required()
    });

    return Validation.validate(details, validationSchema);
}

