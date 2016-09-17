module.exports = function (app, router) {
    var fakeChecker = require('../controllers/fakeChecker.controller');
    router.get('/api', fakeChecker.render);
    router.get('/check/:uuid', fakeChecker.keyByUIID);
    //  app.param('uuid', fakeChecker.keyByUIID);
};
