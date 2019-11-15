const TokenService = require('../components/token/token.service');
const Error = require('../utils/Error');

module.exports = async (req, res, next) => {
    try {
        await TokenService.validateToken(req);
        next();
    } catch (err) {
        Error.handleError(err, res);
    }
};