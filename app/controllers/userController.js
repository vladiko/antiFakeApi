"use strict";
var User = require('mongoose').model('User');
var passport = require('passport');
var jwt = require('jsonwebtoken');
setInterval(function () {
    //logout for users that the token is 
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
            var token = jwt.sign(user, 'dddddafaefafaf');
            res.json(token);
        })(req, res, next);
    },
    logout: function (req, res, next) {
        res.json({ user: 'logout' });
    }
};
//# sourceMappingURL=userController.js.map