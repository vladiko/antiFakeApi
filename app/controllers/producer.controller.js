"use strict";
var producerModel = require('../models/producerModel');
var producer = producerModel.model;
var ProducerController = (function () {
    function ProducerController() {
    }
    ProducerController.requiresLogin = function (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
        next();
    };
    ProducerController.list = function (req, res, next) {
        producer.find({}, function (err, producers) {
            if (err) {
                return next(err);
            }
            else {
                res.json(producers);
            }
        });
    };
    ProducerController.create = function (req, res, next) {
        var producer = new producer(req.body);
        producer.save(function (err) {
            if (err) {
                return next(err);
            }
            else {
                res.json(producer);
            }
        });
    };
    return ProducerController;
}());
exports.ProducerController = ProducerController;
//module.exports = {
//} 
//# sourceMappingURL=producer.controller.js.map