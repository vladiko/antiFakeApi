var users = require('../../app/controllers/userController');
module.exports = function (app) {
    app.route('/user')
        .post(users.create)
        .get(users.list);
};
//# sourceMappingURL=user.routes.js.map