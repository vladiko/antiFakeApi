"use strict";
var ItemKey = require('mongoose').model('ItemKey');
var Product = require('mongoose').model('Product');
var Producer = require('mongoose').model('Producer');
var UuidGenerator = require('../services/uuidGenerator');
var KeyRequestDataEntry = (function () {
    function KeyRequestDataEntry(data, serial) {
        this.data = data;
        this.serial = serial;
    }
    return KeyRequestDataEntry;
}());
module.exports = {
    list: function (req, res, next) {
        ItemKey.find({}).exec(function (err, itemKeys) {
            if (err) {
                return next(err);
            }
            else {
                res.json(itemKeys.length);
            }
        });
    },
    create: function (req, res, next) {
        var productName = req.body.productName;
        var datas = req.body.datas;
        var commonData = req.body.data;
        var commonSerial = parseInt(req.body.serial);
        var amount = req.body.amount;
        var keysForDatas;
        if (datas && Array.isArray(datas)) {
            keysForDatas = true;
        }
        else {
            keysForDatas = false;
        }
        Product.findOne({ uniqShortProductName: productName }, 'id', function (err, product) {
            if (err) {
                console.log('error in item key find product');
            }
            else {
                var keysToReturn = [];
                if (keysForDatas) {
                    datas.forEach(function (d) {
                        var itemKey = new Object();
                        itemKey.product = product.id;
                        itemKey.uuid = UuidGenerator.UuidGenerator.generateId();
                        itemKey.data = d.data;
                        itemKey.serial = d.serial;
                        keysToReturn.push(itemKey);
                    });
                }
                else {
                    if (!commonSerial) {
                        commonSerial = 0;
                    }
                    for (var i = 0; i < amount; i++) {
                        var itemKey = new Object();
                        itemKey.product = product.id;
                        itemKey.uuid = UuidGenerator.UuidGenerator.generateId();
                        itemKey.serial = commonSerial++;
                        itemKey.data = commonData;
                        keysToReturn.push(itemKey);
                    }
                }
                ItemKey.collection.insert(keysToReturn, function (err, docs) {
                    if (err) {
                        return next(err);
                    }
                    else {
                        res.json(docs);
                    }
                });
            }
        });
    }
};
//# sourceMappingURL=itemKey.controller.js.map