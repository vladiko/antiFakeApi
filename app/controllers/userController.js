"use strict";
var User = require('mongoose').model('User');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var authHelper = require('../services/authenticatedProduserUsersHelper');
var config = require('../../config/config.js');
setInterval(function () {
    authHelper.AuthenticatedProduserUsersHelper.updateActiveTokens();
}, 60000);
var UserController = (function () {
    function UserController() {
    }
    UserController.requiresLogin = function (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
        next();
    };
    UserController.checkLogin = function (req, res, next) {
        if (req.body.token && authHelper.AuthenticatedProduserUsersHelper.getUserEntry(req.body.username) &&
            authHelper.AuthenticatedProduserUsersHelper.getUserEntry(req.body.username).userToken == req.body.token) {
            next();
        }
        else {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
    };
    UserController.list = function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) {
                return next(err);
            }
            else {
                res.json(users);
            }
        });
    };
    UserController.create = function (req, res, next) {
        var user = new User(req.body);
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            else {
                res.json(user);
            }
        });
    };
    UserController.login = function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send({ gotToken: false, message: info.message });
            }
            req.user = user;
            res.user = user;
            var token = jwt.sign('user.username' + 'user.password', config.jwtSecret);
            authHelper.AuthenticatedProduserUsersHelper.addUser(user, token);
            res.token = token;
            res.send({ gotToken: true, token: token });
        })(req, res, next);
    };
    UserController.logout = function (req, res, next) {
        res.json({ user: 'logout' });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map