var User = require('mongoose').model('User');
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import authHelper = require('../services/authUsersHelper');
var config = require('../../config/config.js');
export class UserController {
    public static authUserHelper = new authHelper.AuthUsersHelper(20, 60000);
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
        var userEntry: authHelper.ActiveUserEntry;
        if (username && usertoken) {
            userEntry = UserController.authUserHelper.getUserEntry(username);
        }
        if (userEntry && userEntry.userToken == usertoken) {
            req.user = userEntry.user;
            next();
        } else {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
    };

    public static authorizeForUsers = (req, res, next) => {
        if (req.user) {
            if (req.user.role == authHelper.UserAuthorizationRoles.SUPER_USER || req.user.role == authHelper.UserAuthorizationRoles.USERS_ADMIN) {
                next();
            } else {
                return res.status(403).send({
                    message: 'Forbidden'
                });
            }
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
            UserController.authUserHelper.addUser(user, token);
            res.token = token;
            res.send({ gotToken: true, token: token });
        })(req, res, next);
    };
    public static logout = (req, res, next) => {
        res.json({ user: 'logout' });
    }
}
