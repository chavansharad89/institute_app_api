const SubjectController = require('./subject.controller');
const auth = require('../../middlewares/auth');

module.exports = {
    routes,
    mobileRoutes
};

function routes(express) {
    const router = express.Router();
    return router;
}

function mobileRoutes(express) {
    const router = express.Router();
    router.post('/create', SubjectController.addSubject);
    return router;
}