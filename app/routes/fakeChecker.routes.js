module.exports = function (app) {
    var fakeChecker = require('../controllers/fakeChecker.controller');
    app.get('/', fakeChecker.render);
    //app.get('/list/', index.imgList);
};
