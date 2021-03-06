"use strict";
var config = require('./config');
var mongoose = require('mongoose');
module.exports = function () {
    var db = mongoose.connect(config.dbUrl);
    require('../app/models/userModel');
    require('../app/models/producerModel');
    require('../app/models/productModel');
    require('../app/models/itemKeyModel');
    return db;
};
//# sourceMappingURL=mongoose.js.map