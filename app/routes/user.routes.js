var users = require('../../app/controllers/userController');
module.exports = function (app) {
    app.route('/user')
        .post(users.create)
        .get(users.list);
    app.route('/user/login')
        .post(users.login)
        .get(users.login);
    app.route('/user/logout')
        .post(users.logout)
        .get(users.logout);
};
//# sourceMappingURL=user.routes.js.map