const {promisify} = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtVerify = promisify(jwt.verify);
const Error = require('./Error');

const jwtConfig = {
    secret: process.env.tokenSecret || '4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM',
    algorithm: 'HS256',
    issuer: 'r-tech',
    audience: 'r-tech',
    expiresIn: 60 * 60 * 24 * 7
};

module.exports = {
    generatePassword,
    validatePassword,
    generateJWT,
    validateJWT,
    jwtConfig
};

//generate Bcrypt Password
function generatePassword(password) {
    const salt = 10;
    return bcrypt.hash(password, salt);
}

//generate JWT token
function generateJWT(userDetails) {
    return jwt.sign(userDetails,
        jwtConfig.secret,
        {
            algorithm: jwtConfig.algorithm,
            issuer: jwtConfig.issuer,
            audience: jwtConfig.audience,
            expiresIn: jwtConfig.expiresIn
        });
}

//validate password
function validatePassword(paramPassword, userPassword) {
    return bcrypt.compare(paramPassword, userPassword);
}

//validate JWT
function validateJWT(token, secret) {
    return jwtVerify(token, secret)
        .then(decoded => decoded)
        .catch(err => {
            throw _expireTokenError(err);
        });
}

function _expireTokenError(err) {
    return {
        type: Error.ExpireToken,
        details: {
            error: err
        }
    };
}