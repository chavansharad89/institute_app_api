const Constant = require('./Constant');
const ErrorTypes = {
    SomethingWentWrong: 'SomethingWentWrong',
    InvalidDetails: 'InvalidDetails',
    EmailIdAlreadyExistsForVendor: 'EmailIdAlreadyExistsForVendor',
    InvalidCredentials: 'InvalidCredentials',
    ExpireToken: 'ExpireToken',
    QuestionIdsRequire: 'QuestionIdsRequire',
    ValueNotFound: 'ValueNotFound',
    ValueAlreadyExists: 'ValueAlreadyExists',
    UserAlreadySubmittedRequestForRegistration: 'UserAlreadySubmittedRequestForRegistration',
    UserBlocked: 'UserBlocked',
    UserRejected: 'UserRejected',
    UserPending: 'UserPending',
    UserApproved: 'UserApproved',
    UserNull: 'UserNull',
    InvalidOldPassword: 'InvalidOldPassword',
    UserNotAlumni: 'UserNotAlumni',
    UserNotAuthorized: 'UserNotAuthorized',
    ResetPasswordCodeExpire: 'ResetPasswordCodeExpire',
    UnableToLoginUsingSocialLogin: 'UnableToLoginUsingSocialLogin',
    AlreadyActivatedOrBlocked: 'AlreadyActivatedOrBlocked',
    InvalidValue: 'InvalidValue',
    ValueRequired: 'ValueRequired',
    OnlyOneCoverPhotoAllowed: 'OnlyOneCoverPhotoAllowed',
    OneCoverPhotoRequired: 'OneCoverPhotoRequired',
    CurrentlyAlreadyWorking: 'CurrentlyAlreadyWorking',
    CurrentlyAlreadyStudying: 'CurrentlyAlreadyStudying',
    NotificationAlreadySent: 'NotificationAlreadySent',
    DepartmentDoesNotExistInLocation: 'DepartmentDoesNotExistInLocation',
    Custom: 'Custom',
    TokenNotFound: 'TokenNotFound'
};

module.exports = {
    ...ErrorTypes,
    handleError
};

function handleError(err, res) {
    console.log(err);
    let message = '';
    switch (err.type) {
        case ErrorTypes.InvalidDetails:
            const messageArray = Array.isArray(err.details.message) ? err.details.message : [err.details.message];
            message = 'Invalid parameter(s)';
            const messageData = messageArray.map(({message, context, context: {key}}) => ({message, key, context}));
            _handleBadRequest(message, res, messageData);
            break;
        case ErrorTypes.InvalidCredentials:
            message = 'Invalid Username and Password';
            _handleBadRequest(message, res);
            break;
        case ErrorTypes.InvalidValue:
            message = `Invalid ${err.details.value} provided`;
            _handleBadRequest(message, res);
            break;
        case ErrorTypes.ValueAlreadyExists:
            message = `${err.details.value} already exists`;
            _handleBadRequest(message, res);
            break;
        case ErrorTypes.ExpireToken:
            message = 'Token is Expired';
            _handleNotAuthorized(message, res);
            break;
        case ErrorTypes.Custom:
            message = err.details.value;
            _handleBadRequest(message, res);
            break;
        case ErrorTypes.UserNotAuthorized:
            message = 'User not Authorized';
            _handleNotAuthorized(message, res);
            break;
        case ErrorTypes.TokenNotFound:
            message = 'Token not found';
            _handleNotFound(message, res);
            break;
        case ErrorTypes.ValueNotFound:
            message = `${err.details.value} not found`;
            _handleNotFound(message, res);
            break;
        case ErrorTypes.NotificationAlreadySent:
            message = `Details cannot be edited as notification already sent`;
            _handleBadRequest(message, res);
            break;
        case ErrorTypes.ResetPasswordCodeExpire:
            message = 'Reset Password Code is Expired';
            _handleBadRequest(message, res);
            break;
        case ErrorTypes.InvalidOldPassword:
            message = 'Invalid current password';
            _handleBadRequest(message, res);
            break;
        default:
            _handleSomethingWentWrong(err, res);
    }
}

function _handleSomethingWentWrong(err, res) {
    res.status(Constant.httpCode.someThingWentWrong.code).send({
        message: Constant.httpCode.someThingWentWrong.message,
        data: JSON.stringify(err)
    });
}

function _handleBadRequest(message, res, errData = null) {
    let errorObj = {
        message: message || Constant.httpCode.badRequest.message
    };
    if (errData) {
        errorObj.data = errData;
    }
    res.status(Constant.httpCode.badRequest.code).send(errorObj);
}

function _handleNotAuthorized(message, res) {
    res.status(Constant.httpCode.notAuthorized.code).send({
        message: message || Constant.httpCode.notAuthorized.message
    });
}

function _handleNotFound(message, res) {
    res.status(Constant.httpCode.notFound.code).send({
        message: message || Constant.httpCode.notFound.message
    });
}
