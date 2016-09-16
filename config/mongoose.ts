var config = require('./config');
import * as mongoose  from 'mongoose';
module.exports = function () {
    let db = mongoose.connect(config.dbUrl);
    require('../app/models/userModel');
    require('../app/models/producerModel');
    require('../app/models/productModel');
    return db;
};