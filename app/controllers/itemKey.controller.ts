import * as mongoose from 'mongoose';
var ItemKey = require('mongoose').model('ItemKey');
var Product = require('mongoose').model('Product');
var Producer = require('mongoose').model('Producer');
let idGenerator = require('../services/uuidGenerator');

module.exports = {
    list: (req, res, next) => {
        ItemKey.find({}).exec((err, products) => {
            if (err) {
                return next(err);
            } else {
                res.json(products);
            }
        });
    },
    create: (req, res, next) => {
        var productName = req.body.productName;
        var amount = req.body.amount;
        console.log(JSON.stringify(productName));
        console.log(JSON.stringify(amount));
        Product.findOne({ uniqShortProductName: productName }, 'id', (err, product) => {
            console.log(JSON.stringify(product));
            if (err) {
                console.log('error in item key find product');
            } else {
                var itemKey = new ItemKey(req.body);
                itemKey.product = product;
                itemKey.uuid = idGenerator();
               
                itemKey.save((err) => {
                    if (err) {
                        return next(err);
                    } else {
                        res.json(itemKey);
                    }
                });
            }
        });
    }
}