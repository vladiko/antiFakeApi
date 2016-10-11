﻿import users = require('../../app/controllers/userController');

module.exports = function (app) {
    app.route('/user')
        .post(users.UserController.create)
        .get(users.UserController.list);
    app.route('/user/login')
        .post(users.UserController.login);
    app.route('/user/logout')
        .post(users.UserController.logout)
        .get(users.UserController.logout);
    app.route('/user/list')
        .post(users.UserController.checkLogin, users.UserController.list);
};