var config = require('./config');
import mongoose = require('mongoose');
module.exports = function () {
    var db = mongoose.connect(config.dbUrl);
    
    return db;
};