import * as mongoose from 'mongoose';
import producerModel = require('../models/producerModel');
var producer: mongoose.Model<producerModel.IProducerModel> = require('mongoose').model('Producer');//producer
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
        producer.find({}, (err, producers: producerModel.IProducerModel[]) => {
            if (err) {
                return next(err);
            } else {
                res.json(producers);
            }
        });
    },
    create: (req, res, next) => {
        var producer = new producer(req.body);
        producer.save((err) => {
            if (err) {
                return next(err);
            } else {
                res.json(producer);
            }
        });
    }
}