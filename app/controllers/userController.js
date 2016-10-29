"use strict";
var passport = require('passport');
var jwt = require('jsonwebtoken');
var authHelper = require('../services/authUsersHelper');
var config = require('../../config/config.js');
var userModel = require('../models/userModel');
var User = userModel.model;
var UserController = (function () {
    function UserController() {
    }
    UserController.authUserHelper = new authHelper.AuthUsersHelper(20, 60000);
    //public static requiresLogin: express.RequestHandler = (req, res, next) => {
    //    if (!req.isAuthenticated()) {
    //        return res.status(401).send({
    //            message: 'User is not logged in'
    //        });
    //    }
    //    next();
    //};
    UserController.checkLogin = function (req, res, next) {
        var username = req.query.username;
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
    UserController.update = function (req, res, next) {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (err) {
                next(err);
            }
            var userToUpdate = user;
            if (req.body.firstName && req.body.firstName.trim()) {
                userToUpdate.firstName = req.body.firstName.trim();
            }
            if (req.body.lastName && req.body.lastName.trim()) {
                userToUpdate.lastName = req.body.lastName.trim();
            }
            if (req.body.role && req.body.role.trim()) {
                userToUpdate.role = req.body.role.trim();
            }
            if (req.body.email && req.body.email.trim()) {
                userToUpdate.email = req.body.email.trim();
            }
            if (req.body.password && req.body.password.trim()) {
                userToUpdate.password = req.body.password.trim();
            }
            if (req.body.provider && req.body.provider.trim()) {
                userToUpdate.provider = req.body.provider.trim();
            }
            else {
                if (!userToUpdate.provider || !userToUpdate.provider.trim()) {
                    userToUpdate.provider = 'local';
                }
            }
            ;
            var userModel = userToUpdate;
            userModel.save(function (err) {
                if (err) {
                    return next(err);
                }
                else {
                    res.json(userToUpdate);
                }
            });
        });
    };
    UserController.login = function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            else if (!user) {
                res.send({ gotToken: false, message: info.message });
            }
            else {
                req.user = user;
                var token = jwt.sign('user.username' + 'user.password', config.jwtSecret);
                UserController.authUserHelper.addUser(user, token);
                res.send({ gotToken: true, token: token });
            }
        })(req, res, next);
    };
    UserController.destroy = function (req, res, next) {
        User.findOne({ username: req.params.username }, function (err, user) {
            if (err) {
                return next(err);
            }
            else {
                User.remove({ username: req.params.username }, function (errr) {
                    if (errr) {
                        next(errr);
                    }
                    else {
                        res.send({ user: user.username, removed: true });
                    }
                });
            }
        });
    };
    UserController.logout = function (req, res, next) {
        if (req.user) {
            UserController.authUserHelper.removeUser(req.user.username);
            res.json({ logout: req.user.username });
        }
        else {
            next(new Error());
        }
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map