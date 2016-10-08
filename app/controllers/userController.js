"use strict";
/// <reference path="../services/authenticatedProduserUsersHelper.ts" />
var User = require('mongoose').model('User');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var authHelper = require('../services/authenticatedProduserUsersHelper');
var config = require('../../config/config.js');
setInterval(function () {
    authHelper.AuthenticatedProduserUsersHelper.updateActiveTokens();
}, 60000);
module.exports = {
    requiresLogin: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
        next();
    },
    checkLogin: function (req, res, next) {
        if (req.body.token && authHelper.AuthenticatedProduserUsersHelper.getUserEntry(req.body.username) &&
            authHelper.AuthenticatedProduserUsersHelper.getUserEntry(req.body.username).userToken == req.body.token) {
            next();
        }
        else {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
    },
    list: function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) {
                return next(err);
            }
            else {
                res.json(users);
            }
        });
    },
    create: function (req, res, next) {
        var user = new User(req.body);
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            else {
                res.json(user);
            }
        });
    },
    login: function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send('false');
            }
            req.user = user;
            res.user = user;
            var token = jwt.sign('user.username', config.jwtSecret);
            authHelper.AuthenticatedProduserUsersHelper.addUser(user, token);
            res.token = token;
            res.send(token);
        })(req, res, next);
    },
    logout: function (req, res, next) {
        res.json({ user: 'logout' });
    }
};
//# sourceMappingURL=userController.js.map