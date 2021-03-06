"use strict";
var passport = require('passport');
var passportLocal = require('passport-local'); //.Strategy,
var LocalStrategy = passportLocal.Strategy;
var User = require('mongoose').model('User');
module.exports = function () {
    passport.use(new LocalStrategy(function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, user);
        });
    }));
};
//# sourceMappingURL=local.js.map