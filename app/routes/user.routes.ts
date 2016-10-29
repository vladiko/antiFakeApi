import users = require('../../app/controllers/userController');

module.exports = (app) => {
    app.route('/user')
        .post(users.UserController.checkLogin, users.UserController.authorizeForUsers, users.UserController.create)
        .get(users.UserController.checkLogin, users.UserController.authorizeForUsers, users.UserController.list)
        .put(users.UserController.checkLogin, users.UserController.authorizeForUsers, users.UserController.update);
    app.route('/user/login')
        .post(users.UserController.login);
    app.route('/user/logout')
        .post(users.UserController.checkLogin, users.UserController.logout)
        .get(users.UserController.checkLogin, users.UserController.logout);
    app.route('/user/list')
        .post(users.UserController.checkLogin, users.UserController.authorizeForUsers, users.UserController.list);
    app.route('/user/:username')
        .delete(users.UserController.checkLogin, users.UserController.authorizeForUsers, users.UserController.destroy);
    var errorHandler = (err, req, res, next) => {
        console.error(err);
        res.status(500).send('Something broke in users!');
    };
    app.use('/user', errorHandler);
};