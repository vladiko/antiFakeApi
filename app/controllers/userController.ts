var User = require('mongoose').model('User');
import * as passport from 'passport';
setInterval(() => {
    //logout for users that the token is 
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
            res.json(req.isAuthenticated());
        })(req, res, next);
    },
    logout: (req, res, next) => {
        res.json({ user: 'logout' });
    }
}
