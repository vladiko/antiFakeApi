import FakeCheckerController = require('../controllers/fakeChecker.controller');
module.exports = (app: any, router) => {
    // var fakeChecker = require('../controllers/fakeChecker.controller');
    router.get('/api', FakeCheckerController.fakeCheckerController.render);

    router.get('/check/:uuid', FakeCheckerController.fakeCheckerController.keyByUIID);
    //  app.param('uuid', fakeChecker.keyByUIID);
};