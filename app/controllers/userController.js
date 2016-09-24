var User = require('mongoose').model('User');
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
    }
};
//# sourceMappingURL=userController.js.map