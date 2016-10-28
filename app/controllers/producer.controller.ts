import * as mongoose from 'mongoose';
import * as express from 'express';
import producerModel = require('../models/producerModel');
var producer = producerModel.model;

export class ProducerController {
    public static requiresLogin: express.RequestHandler = (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }
        next();
    };
    public static list: express.RequestHandler = (req, res, next) => {
        producer.find({}, (err, producers: producerModel.IProducerModel[]) => {
            if (err) {
                return next(err);
            } else {
                res.json(producers);
            }
        });
    };
    public static create: express.RequestHandler = (req, res, next) => {
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
//module.exports = {

//}