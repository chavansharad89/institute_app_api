const Error = require('../../utils/Error');
const _ = require('lodash');

module.exports = {
    getJwt,
    getAppId,
    getAuthorizationTokenType
};

/////////////////////////////////////////////////PUBLIC FUNCTION/////////////////////////////////////////////////////
//get JWT
function getJwt(req) {
    return _checkJwtInQueryParams(req)
        .then(jwt => _checkJwt(jwt));

    function _checkJwt(jwt) {
        if (!jwt) {
            return _getTokenFromHeaders(req, 'Token')
                .then((tokenDetails) => _getTokenValue(tokenDetails));
        }
        return jwt;
    }
}

//get App Id
async function getAppId(req) {
    try {
        let appId = await _checkAppIdInQueryParams(req);
        if (!appId) {
            const tokenDetails = await _getTokenFromHeaders(req, 'App Id');
            appId = await _getTokenValue(tokenDetails, 'APP_ID');
        }
        return appId;
    } catch (err) {
        throw err;
    }
}

async function getAuthorizationTokenType(req) {
    try {
        const token = await _getTokenFromQueryParams(req)
            .then(details => !details ? _getTokenFromHeaders(req) : details);
        return {
            type: _.head(token).toLowerCase(),
            value: _.last(token)
        };
    } catch (err) {
        throw err;
    }
}

////////////////////////////////////////?PRIVATE FUNCTION///////////////////////////////////////////

function _checkJwtInQueryParams(req) {
    const jwt = _getJWTFromQueryParams(req);
    return Promise.resolve(jwt);
}

function _getJWTFromQueryParams(req) {
    return req.params.jwt || req.params.JWT || req.query.jwt || req.query.JWT;
}

function _getTokenFromHeaders(req, type = 'token') {
    let token = req.headers.authorization;
    return new Promise((resolve, reject) => {
        if (token) {
            resolve(token.split(' '));
        } else {
            reject(_throwTokenNotFound(type));
        }
    });
}

function _getTokenValue(tokenDetails, authorizationType = 'JWT') {
    if (_.size(tokenDetails) === 2 && tokenDetails[0].toLowerCase() === authorizationType.toLowerCase()) {
        return tokenDetails[1];
    } else {
        throw _throwTokenNotFound('token');
    }
}

function _throwTokenNotFound(type) {
    return {
        type: Error.ValueNotFound,
        details: {
            value: type
        }
    };
}

async function _checkAppIdInQueryParams(req) {
    try {
        return await _getAppIdFromQueryParams(req);
    } catch (err) {
        throw err;
    }
}

function _getAppIdFromQueryParams(req) {
    return req.params.app_id || req.params.APP_ID || req.query.app_id || req.query.APP_ID;
}

function _getTokenFromQueryParams(req) {
    const appId = _getAppIdFromQueryParams(req);
    const jwt = _getJWTFromQueryParams(req);
    return new Promise((resolve, reject) => {
        if (appId) {
            resolve(['APP_ID', appId]);
        } else if (jwt) {
            resolve(['JWT', jwt]);
        } else {
            resolve(null);
        }
    });
}