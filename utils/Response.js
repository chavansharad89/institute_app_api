const Constant = require('./Constant');
module.exports = {
    handleSuccess
};

function handleSuccess(result, res) {
    res.status(Constant.httpCode.success.code).send({
        message: Constant.httpCode.success.message,
        data: result || {}
    });
}
