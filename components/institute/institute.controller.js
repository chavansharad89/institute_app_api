const Joi = require('@hapi/joi');
const TokenService = require('../token/token.service');
const Response = require('../../utils/Response');
const Error = require('../../utils/Error');
const Validation = require('../../utils/Validation');
const InstituteService = require('./institute.service');

module.exports = {
    registerInstitute
};


async function registerInstitute(req, res) {
    try {
        const instituteDetails = await _validateInstituteDetails(req.body || {});
        const result = await InstituteService.registerInstitute(instituteDetails);
        Response.handleSuccess(result, res);
    } catch (err) {
        Error.handleError(err, res);
    }
}

function _validateInstituteDetails(details) {
    const validationSchema = Joi.object().keys({
        name: Joi.string().required(),
        address: Joi.object().keys({
            addressLine1: Joi.string().required(),
            addressLine2: Joi.string().optional(),
            city: Joi.string().required(),
            state: Joi.string().optional(),
            zipcode: Joi.string().optional()
        }).required(),
        
        email: Joi.string().optional(),
        password: Joi.string().required(),
        contactPersonDetails: Joi.object().keys({
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            phoneNumber: Joi.string().optional()
        }),
        phoneNumber: Joi.string().required()
    });

    return Validation.validate(details, validationSchema);
}

