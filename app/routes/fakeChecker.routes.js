"use strict";
var FakeCheckerController = require('../controllers/fakeChecker.controller');
module.exports = function (app, router) {
    router.get('/api', FakeCheckerController.fakeCheckerController.render);
    router.get('/check/:uuid', FakeCheckerController.fakeCheckerController.keyByUIID);
};
//# sourceMappingURL=fakeChecker.routes.js.map