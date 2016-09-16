var Produser = require('mongoose').model('Produser');
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
        Produser.find({}, function (err, produsers) {
            if (err) {
                return next(err);
            }
            else {
                res.json(produsers);
            }
        });
    },
    create: function (req, res, next) {
        var produser = new Produser(req.body);
        produser.save(function (err) {
            if (err) {
                return next(err);
            }
            else {
                res.json(produser);
            }
        });
    }
};
