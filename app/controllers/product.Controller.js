"use strict";
var Product = require('mongoose').model('Product');
var Producer = require('mongoose').model('Producer');
module.exports = {
    list: function (req, res, next) {
        Product.find({}).populate('producer').exec(function (err, products) {
            if (err) {
                return next(err);
            }
            else {
                res.json(products);
            }
        });
    },
    create: function (req, res, next) {
        var producerName = req.body.producerName;
        Producer.findOne({ uniqShortProducerName: producerName }, 'id', function (err, producer) {
            console.log(JSON.stringify(producerName));
            console.log(JSON.stringify(producer));
            if (err) {
                console.log('error in froduct find producer');
            }
            else {
                var product = new Product(req.body);
                product.producer = producer;
                product.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    else {
                        res.json(product);
                    }
                });
            }
        });
    }
};
