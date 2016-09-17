import * as mongoose from 'mongoose';
var ItemKey = require('mongoose').model('ItemKey');
var Product = require('mongoose').model('Product');
var Producer = require('mongoose').model('Producer');
let idGenerator = require('../services/uuidGenerator');
class KeyRequestDataEntry {
    constructor(public data: string, public serial: string) { }
}




module.exports = {
    list: (req, res, next) => {
        ItemKey.find({}).exec((err, itemKeys: Array<Object>) => {
            if (err) {
                return next(err);
            } else {
                res.json(itemKeys.length);
            }
        });
    },
    create: (req, res, next) => {
        var productName = req.body.productName;
        var datas = <KeyRequestDataEntry[]>req.body.datas;
        var commonData = req.body.data;
        var commonSerial = parseInt(req.body.serial);
        var amount = req.body.amount;
        var keysForDatas;
        if (datas && Array.isArray(datas)) {
            keysForDatas = true;
        } else {
            
            keysForDatas = false;
        }

        Product.findOne({ uniqShortProductName: productName }, 'id', (err, product) => {
            if (err) {
                console.log('error in item key find product');
            } else {
                var keysToReturn = [];
                if (keysForDatas) {
                    datas.forEach((d: KeyRequestDataEntry) => {
                        var itemKey: any = new Object();
                        itemKey.product = product.id;
                        itemKey.uuid = idGenerator();
                        itemKey.data = d.data;
                        itemKey.serial = d.serial;
                        keysToReturn.push(itemKey);
                    });
                 
                  
                } else {
                    if (!commonSerial) {
                        commonSerial = 0;
                    }
                    for (var i = 0; i < amount; i++) {
                        var itemKey: any = new Object();
                        itemKey.product = product.id;
                        itemKey.uuid = idGenerator();
                        itemKey.serial = commonSerial++;
                        itemKey.data = commonData;
                        keysToReturn.push(itemKey);
                    }                    
                }
                ItemKey.collection.insert(keysToReturn, (err, docs) => {
                    if (err) {
                        return next(err);
                    } else {
                        res.json(docs);
                    }
                });
            }
        });
    }
}