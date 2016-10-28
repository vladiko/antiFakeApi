"use strict";
var producer = require('mongoose').model('Producer'); //producer
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
        producer.find({}, function (err, producers) {
            if (err) {
                return next(err);
            }
            else {
                res.json(producers);
            }
        });
    },
    create: function (req, res, next) {
        var producer = new producer(req.body);
        producer.save(function (err) {
            if (err) {
                return next(err);
            }
            else {
                res.json(producer);
            }
        });
    }
};
//# sourceMappingURL=producer.controller.js.map