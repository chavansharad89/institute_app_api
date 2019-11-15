const Joi = require('@hapi/joi');
const TokenService = require('../token/token.service');
const StudentService = require('./student.service');
const Response = require('../../utils/Response');
const Error = require('../../utils/Error');
const Validation = require('../../utils/Validation');

module.exports = {
    registerStudent
};


async function registerStudent(req, res) {
    try {
        const studentDetails = await _validateStudentDetails(req.body || {});
        const result = await StudentService.registerStudent(studentDetails);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}


function _validateStudentDetails(details) {
    const validationSchema = Joi.object().keys({
        courseId: Joi.number().integer().optional(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().allow(null, "").optional(),
        password: Joi.string().required(),
        parentDetails: Joi.object().keys({
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            phoneNumber: Joi.string().optional()
        }),
        phoneNumber: Joi.string().required()
    });

    return Validation.validate(details, validationSchema);
}

