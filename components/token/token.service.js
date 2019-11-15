const Auth = require('../../utils/Auth');
const HeaderService = require('../header/header.service');
const Error = require('../../utils/Error');

module.exports = {
    getTokenDetails,
    validateToken
};

async function getTokenDetails(req) {
    try {
        const token = await HeaderService.getJwt(req);
        return await Auth.validateJWT(token, Auth.jwtConfig.secret);
    } catch (err) {
        throw err;
    }
}

async function validateToken(req) {
    try {
        const token = await HeaderService.getJwt(req);
        const userData = await Auth.validateJWT(token, Auth.jwtConfig.secret);
        const result = await _checkTokenExists(token);
        if (!result) {
            throw _expireTokenError();
        }
        return userData;
    } catch (err) {
        throw err;
    }
}

function _checkTokenExists(token) {
    return Models.Jwt.findOne({
        where: {
            token,
            revoked: false
        }
    });
}

function _expireTokenError() {
    return {
        type: Error.ExpireToken,
        details: {}
    };
}