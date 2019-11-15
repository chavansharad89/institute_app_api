const Joi = require('@hapi/joi');
const Error = require('./Error');
const DEFAULT_OPTIONS = {
    abortEarly: false,
    stripUnknown: false,
    allowUnknown: true
};

module.exports = {
    validate
};

async function validate(details, validationSchema, option = DEFAULT_OPTIONS) {
    try {
        const {error, value} = await validationSchema.validate(details, option);
        console.log(error);
        if(error) {
            throw error;
        }        
        return value;
    } catch(err) {
        throw _throwValidationError(err.details);
    }
}

function _throwValidationError(message) {
    return {
        type: Error.InvalidDetails,
        details: {
            message: message
        }
    };
}