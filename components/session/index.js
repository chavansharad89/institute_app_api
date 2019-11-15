const SessionController = require('./session.controller');
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
    router.get('/', SessionController.getSessionList);
    router.get('/:id', SessionController.getSessionDetailsBySessionId);
    router.post('/create', SessionController.createSession);
    router.put('/:id/edit', SessionController.editSession);
    return router;
}