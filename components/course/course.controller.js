const Joi = require('@hapi/joi');
const TokenService = require('../token/token.service');
const Response = require('../../utils/Response');
const Error = require('../../utils/Error');
const Constant = require('../../utils/Constant');
const Validation = require('../../utils/Validation');
const CourseService = require('./course.service');

module.exports = {
    deleteCourse,
    addCourse,
    updateCourse
};


async function addCourse(req, res) {
    try {
        const [courseDetailsToAdd, {roleName}] = await Promise.all([
            _validateCourseDetails(req.body || {}),
            TokenService.getTokenDetails(req)
        ]);
        const { name } = courseDetailsToAdd;
        if(roleName !== Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const result = await CourseService.addCourse(name);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function updateCourse(req, res) {
    try {
        const [, {roleName}] = await Promise.all([
            _validateCourseDetails(req.params),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Utils.Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const result = await CourseService.addCourse(courseId, name);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

async function deleteCourse(req, res) {
    try {
        const [, {roleName}] = await Promise.all([
            _validateCourseId(req.params),
            TokenService.getTokenDetails(req)
        ]);
        if(roleName !== Utils.Constant.ROLES.ADMIN) {
            throw _throwPermissionDeniedError();
        }
        const result = await CourseService.deleteCourse(courseId);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}


function _throwPermissionDeniedError() {
    return Utils.Error.handleError().defaultError('Permission Denied');
}


function _validateCourseId(details) {
    const validationSchema = Joi.object().keys({
        courseId: Joi.number().integer().required()
    });

    return Validation.validate(details, validationSchema);
}


function _validateCourseDetails(details) {
    const validationSchema = Joi.object().keys({
        courseId: Joi.number().integer().optional(),
        name: Joi.string().required()
    });

    return Validation.validate(details, validationSchema);
}

