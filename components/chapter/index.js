const ChapterController = require('./chapter.controller');
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
    router.post('/create', ChapterController.addChapter);
    return router;
}