import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import authHelper = require('../services/authUsersHelper');
var config = require('../../config/config.js');
import userModel = require('../models/userModel');
var User = userModel.model;
export class UserController {
    public static authUserHelper = new authHelper.AuthUsersHelper(20, 60000);
    //public static requiresLogin: express.RequestHandler = (req, res, next) => {
    //    if (!req.isAuthenticated()) {
    //        return res.status(401).send({
    //            message: 'User is not logged in'
    //        });
    //    }
    //    next();
    //};
    public static checkLogin: express.RequestHandler = (req, res, next) => {
        var username = req.query.username;
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

    public static authorizeForUsers: express.RequestHandler = (req, res, next) => {
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

    public static list: express.RequestHandler = (req, res, next) => {
        User.find({}, '-password -salt', (err, users) => {
            if (err) {
                return next(err);
            } else {
                res.json(users);
            }
        });
    };

    public static create: express.RequestHandler = (req, res, next) => {
        var user = new User(req.body);
        user.save((err) => {
            if (err) {
                return next(err);
            } else {
                res.json(user);
            }
        });
    };

    public static update: express.RequestHandler = (req, res, next) => {
        User.findOne({ username: req.body.username }, (err, user) => {
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
            } else {
                if (!userToUpdate.provider || !userToUpdate.provider.trim()) {
                    userToUpdate.provider = 'local';
                }
            };

            var userModel = <userModel.IUserModel>userToUpdate;
            userModel.save((err) => {
                if (err) {
                    return next(err);
                } else {
                    res.json(userToUpdate);
                }
            });
        });
    };

    public static login: express.RequestHandler = (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            } else if (!user) {
                res.send({ gotToken: false, message: info.message });
            } else {
                req.user = user;
                var token = jwt.sign('user.username' + 'user.password', config.jwtSecret);
                UserController.authUserHelper.addUser(user, token);
                res.send({ gotToken: true, token: token });
            }

        })(req, res, next);
    };

    public static destroy: express.RequestHandler = (req, res, next) => {
        User.findOne({ username: req.params.username }, (err, user) => {
            if (err) {
                return next(err);
            } else {
                User.remove({ username: req.params.username }, (errr) => {
                    if (errr) {
                        next(errr);
                    } else {
                        res.send({ user: user.username, removed: true });
                    }
                });
            }
        });
    };

    public static logout: express.RequestHandler = (req, res, next) => {
        if (req.user) {
            UserController.authUserHelper.removeUser((<userModel.IUserModel>req.user).username);
            res.json({ logout: (<userModel.IUserModel>req.user).username });
        } else {
            next(new Error());
        }
    }
}
