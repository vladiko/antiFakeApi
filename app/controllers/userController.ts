/// <reference path="../services/authenticatedProduserUsersHelper.ts" />
var User = require('mongoose').model('User');
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import authHelper = require('../services/authenticatedProduserUsersHelper');
var config = require('../../config/config.js');
setInterval(() => {
    authHelper.AuthenticatedProduserUsersHelper.updateActiveTokens();
}, 60000);
module.exports = {
    requiresLogin: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
        next();
    },
    checkLogin: (req, res, next) => {
        if (req.body.token && authHelper.AuthenticatedProduserUsersHelper.getUserEntry(req.body.username) &&
            authHelper.AuthenticatedProduserUsersHelper.getUserEntry(req.body.username).userToken == req.body.token) {
            next();
        } else {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
    },
    list: (req, res, next) => {
        User.find({}, (err, users) => {
            if (err) {
                return next(err);
            } else {
                res.json(users);
            }
        });
    },
    create: (req, res, next) => {
        var user = new User(req.body);
        user.save((err) => {
            if (err) {
                return next(err);
            } else {
                res.json(user);
            }
        });
    },
    login: (req, res, next) => {
        passport.authenticate('local', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.send('false'); }
            req.user = user;
            res.user = user;
            var token = jwt.sign('user.username', config.jwtSecret);
            authHelper.AuthenticatedProduserUsersHelper.addUser(user, token);
            res.token = token;
            res.send(token);
        })(req, res, next);
    },
    logout: (req, res, next) => {
        res.json({ user: 'logout' });
    }
}
