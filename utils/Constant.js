const environment = {
    DEVELOPMENT: 'development',
    TESTING: 'testing',
    PRODUCTION: 'production'
};


const httpCode = {
    success: {
        code: 200,
        message: 'success'
    },
    notFound: {
        code: 404,
        message: 'Data not found'
    },
    someThingWentWrong: {
        code: 500,
        message: 'something went wrong'
    },
    parameterRequired: {
        code: 422,
        message: 'Parameter Required'
    },
    noContent: {
        code: 204,
        message: 'no data'
    },
    badRequest: {
        code: 400,
        message: 'Bad request'
    },
    notAuthorized: {
        code: 401,
        message: 'Not Authorized request'
    }
};

const appUrl = {
    development: {
        url: 'http://191.191.190.16:3000/'
    },
    testing: {
        url: 'http://localhost:3000/api/'
    },
    production: {
        url: 'http://localhost:3000/api/'
    }
};

const tokenUrl = {
    development: {
        url: 'http://191.191.190.16:8000/#!/'
    },
    testing: {
        url: 'http://localhost:3000/#!/'
    },
    production: {
        url: 'http://localhost:3000/#!/'
    }
};

const ROLES = {
    ADMIN : 'admin',
    STUDENT: 'student',
    INSTITUTE: 'institute'
};

module.exports = {
    httpCode,
    appUrl,
    tokenUrl,
    environment,
    ROLES
};