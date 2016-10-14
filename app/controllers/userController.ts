var User = require('mongoose').model('User');
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import authHelper = require('../services/authenticatedProduserUsersHelper');
var config = require('../../config/config.js');
setInterval(() => {
    authHelper.AuthenticatedProduserUsersHelper.updateActiveTokens();
}, 60000);
export class UserController {
    public static requiresLogin = (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
        next();
    };
    public static checkLogin = (req, res, next) => {
        var username = req.body.username || req.query.username;
        var usertoken: string = req.body.token || req.query.token;
        if (usertoken && authHelper.AuthenticatedProduserUsersHelper.getUserEntry(username) &&
            authHelper.AuthenticatedProduserUsersHelper.getUserEntry(username).userToken == usertoken) {
            next();
        } else {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
    };
    public static list = (req, res, next) => {
        User.find({}, '-password -salt', (err, users) => {
            if (err) {
                return next(err);
            } else {
                res.json(users);
            }
        });
    };
    public static create = (req, res, next) => {
        var user = new User(req.body);
        user.save((err) => {
            if (err) {
                return next(err);
            } else {
                res.json(user);
            }
        });
    };
    public static login = (req, res, next) => {
        passport.authenticate('local', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.send({ gotToken: false, message: info.message }); }
            req.user = user;
            res.user = user;
            var token = jwt.sign('user.username' + 'user.password', config.jwtSecret);
            authHelper.AuthenticatedProduserUsersHelper.addUser(user, token);
            res.token = token;
            res.send({ gotToken: true, token: token });
        })(req, res, next);
    };
    public static logout = (req, res, next) => {
        res.json({ user: 'logout' });
    }
}
