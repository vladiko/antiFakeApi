"use strict";
var ItemKey = require('mongoose').model('ItemKey');
var Product = require('mongoose').model('Product');
var Producer = require('mongoose').model('Producer');
var fakeCheckerDal = require('../dal/fakeChecker.dal');
var UuidGenerator = require('../services/uuidGenerator');
var KeyRequestDataEntry = (function () {
    function KeyRequestDataEntry(data, serial) {
        this.data = data;
        this.serial = serial;
    }
    return KeyRequestDataEntry;
}());
var fakeCheckerController = (function () {
    function fakeCheckerController() {
    }
    fakeCheckerController.render = function (req, res) {
        var ids = [];
        for (var i = 0; i < 100; i++) {
            ids.push(UuidGenerator.UuidGenerator.generateId());
        }
        var uuid = UuidGenerator.UuidGenerator.generateId();
        fakeCheckerDal.check('d', function (docs) {
            var names = [];
            docs.forEach(function (d) { names.push(JSON.stringify(d)); });
            var idStrins = ids.join('</br>');
            res.send(idStrins + ' Hello World Express Controller: ' + names.join(', '));
        });
    };
    fakeCheckerController.keyByUIID = function (req, res) {
        ItemKey.findOne({
            "uuid": req.params.uuid
        }).populate({
            path: 'product',
            model: 'Product',
            populate: {
                path: 'producer',
                model: 'Producer'
            }
        }).exec(function (err, item) {
            if (err) {
                return (err);
            }
            else {
                if (item) {
                    var retOb = {};
                    retOb.productName = item.product.productName;
                    retOb.companyName = item.product.producer.companyName;
                    retOb.serial = item.serial;
                    retOb.data = item.data;
                    retOb.wasOpen = item.wasOpen;
                    retOb.created = item.created;
                    retOb.openDate = item.openDate;
                    retOb.checkCounter = item.checkCounter++;
                    item.wasOpen = true;
                    if (!item.openDate) {
                        item.openDate = Date.now();
                    }
                    item.save(function (saveErr) {
                        if (saveErr) {
                        }
                    });
                    res.json(retOb);
                }
                else {
                    res.json(null);
                }
            }
        });
    };
    fakeCheckerController.list = function (req, res, next) {
        ItemKey.find({}).exec(function (err, itemKeys) {
            if (err) {
                return next(err);
            }
            else {
                res.json(itemKeys.length);
            }
        });
    };
    fakeCheckerController.create = function (req, res, next) {
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
    };
    return fakeCheckerController;
}());
exports.fakeCheckerController = fakeCheckerController;
//# sourceMappingURL=fakeChecker.controller.js.map