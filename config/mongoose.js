"use strict";
var config = require('./config.js');
var mongoose = require('mongoose');
module.exports = function () {
    var db = mongoose.connect(config.dbUrl);
    return db;
};
