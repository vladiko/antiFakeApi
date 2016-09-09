var User = require('mongoose').model('User');
module.exports = {
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
    }
}
