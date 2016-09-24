"use strict";
var FakeCheckerController = require('../controllers/fakeChecker.controller');
module.exports = function (app, router) {
    // var fakeChecker = require('../controllers/fakeChecker.controller');
    router.get('/api', FakeCheckerController.fakeCheckerController.render);
    router.get('/check/:uuid', FakeCheckerController.fakeCheckerController.keyByUIID);
    //  app.param('uuid', fakeChecker.keyByUIID);
};
//# sourceMappingURL=fakeChecker.routes.js.map