module.exports = function (app) {
    var index = require('../controllers/index.controller');
    app.get('/', index.render);
};
//# sourceMappingURL=index.routes.js.map