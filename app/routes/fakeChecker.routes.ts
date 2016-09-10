module.exports = function (app) {
    var fakeChecker = require('../controllers/fakeChecker.controller');
    app.get('/api', fakeChecker.render);
    //app.get('/list/', index.imgList);
};