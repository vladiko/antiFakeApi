"use strict";
var passport = require('passport');
var jwt = require('jsonwebtoken');
var authHelper = require('../services/authUsersHelper');
var config = require('../../config/config.js');
var userModel = require('../models/userModel');
var User = userModel.userModel;
var UserController = (function () {
    function UserController() {
    }
    UserController.authUserHelper = new authHelper.AuthUsersHelper(20, 60000);
    UserController.requiresLogin = function (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
        next();
    };
    UserController.checkLogin = function (req, res, next) {
        var username = req.body.username || req.query.username;
        var usertoken = req.body.token || req.query.token;
        var userEntry;
        if (username && usertoken) {
            userEntry = UserController.authUserHelper.getUserEntry(username);
        }
        if (userEntry && userEntry.userToken == usertoken) {
            req.user = userEntry.user;
            next();
        }
        else {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
    };
    UserController.authorizeForUsers = function (req, res, next) {
        if (req.user) {
            if (req.user.role == authHelper.UserAuthorizationRoles.SUPER_USER || req.user.role == authHelper.UserAuthorizationRoles.USERS_ADMIN) {
                next();
            }
            else {
                return res.status(403).send({
                    message: 'Forbidden'
                });
            }
        }
        else {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
    };
    UserController.list = function (req, res, next) {
        User.find({}, '-password -salt', function (err, users) {
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
            UserController.authUserHelper.addUser(user, token);
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