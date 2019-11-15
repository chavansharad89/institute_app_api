module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    development: {
        db: {
            host: 'localhost',
            database: 'institute_app',
            user: 'root',
            password: 'admin@123',
            dialect: 'mysql'
        }
    },
    testing: {
        db: {
            host: '52.45.22.183',
            database: 'institute_app',
            user: 'root',
            password: 'admin@123',
            dialect: 'mysql',
            logging: false
        }
    },
    production: {
        db: {
            host: 'localhost',
            database: 'institute_app',
            user: 'root',
            password: 'admin@123',
            dialect: 'mysql',
            logging: false
        }
    }
};
