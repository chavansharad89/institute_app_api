const _ = require('lodash');
const Op = Models.Sequelize.Op;
const Auth = require('../../utils/Auth');
const Error = require('../../utils/Error');
const RoleService = require('../role/role.service');

module.exports = {
    login,
    logout,
    getSession,
    throwIfSessionDoesntExist,
    addAccount,
    getAccountDetailsByEmailOrPhoneNumber
}


// *****************************************************************************************Public methods
async function login(userId, password) {
    let accountDetails = await _authenticateLoginCredentials(userId, password);
    const jwt = Auth.generateJWT(accountDetails);
    await _addJwtInDataBase(jwt, accountDetails.accountId);
    accountDetails = { ...accountDetails, jwt };
    return _.omit(accountDetails, 'password');
}

async function logout(accountDetails, jwt) {
    return _updateJwtToken(jwt)
        .then(_ => accountDetails)
        .catch(err => {
            throw err;
        });
}

async function getSession(req) {
    let jwtToken = req.headers.authorization;
    return jwtToken ? await _validateJwtToken(jwtToken) : null;
}

function throwIfSessionDoesntExist(session) {
    if (!session || !session.accountId) {
        throw _throwSessionNotExistError();
    }
    return session;
}

async function addAccount(accountDetailsToAdd) {
    let { phoneNumber, email, password, role } = accountDetailsToAdd;
    const roleDetails = await RoleService.getRoleDetailsByRoleName(role);
    password = await Auth.generatePassword(password);
    const addedAccountDetails = await _addAccount({phoneNumber, email, password, roleId: roleDetails.roleId});
    return addedAccountDetails;
}

// **********************Private methods

function _addAccount(accountDetailsToAdd) {
    return Models
        .Account
        .create(accountDetailsToAdd)
        .then(addreAccountDetails => addreAccountDetails.get({plain: true}));
}
async function _authenticateLoginCredentials(userId = "", password = "") {
    try {
        const _userkey = userId.toLowerCase();
        const accountDetails = await getAccountDetailsByEmailOrPhoneNumber(_userkey);
        _throwIfAccountDetailsNotExist(accountDetails);
        await _throwIfPasswordIsInvalid(password, accountDetails.password);
        return accountDetails;

    } catch (err) {
        throw err;
    }
}

async function getAccountDetailsByEmailOrPhoneNumber(_userkey) {

    const query = `
            select 
                a.account_id as "accountId",
                a.email,
                a.phone_number as "phoneNumber",
                a.password,
                a.role_id,
                r.name as "roleName"
            from account a
            join role r
            on r.role_id = a.role_id and r.is_active = true
            where (lower(a.email) = '${_userkey}' or a.phone_number = '${_userkey}')
        `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    })
    .then(data => {
        return data && _.size(data) > 0 ? _.head(data) : null;
    });
}

async function _addJwtInDataBase(token, accountId) {
    return Models
        .Jwt.create({
            token,
            accountId
        });
}

async function _updateJwtToken(token) {
    return Models.Jwt.update({
        revoked: true
    }, {
            where: {
                token
            }
        });
}

function _throwIfAccountDetailsNotExist(accountDetails) {
    if (accountDetails === null) {
        throw _throwInvalidLoginCredentialsError();
    }
}

async function _throwIfPasswordIsInvalid(paramPassword, accountPassword) {
    console.log(paramPassword, accountPassword);
    const isPasswordValid = await Auth.validatePassword(paramPassword, accountPassword);
    if (!isPasswordValid) {
        throw _throwInvalidLoginCredentialsError();
    }
}

async function _validateJwtToken(jwt) {
    try {
        const isTokenExpired = await Auth.isTokenExpired(jwt);
        console.log(isTokenExpired);
        return isTokenExpired ? null : await Auth.decodeJwt(jwt);
    } catch (err) {
        return err;
    }
}

function _throwSessionNotExistError() {
    throw new Utils.Errors.InvalidSessionError();
}

function _throwInvalidLoginCredentialsError() {
    return {
        type: Error.InvalidCredentials,
    }
}