"use strict";
var config = require('./config');
var mongoose = require('mongoose');
module.exports = function () {
    var db = mongoose.connect(config.dbUrl);
    require('../app/models/userModel');
    return db;
};
