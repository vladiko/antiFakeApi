var config = require('./config');
import * as mongoose from 'mongoose';
module.exports = () => {
    let db = mongoose.connect(config.dbUrl);
    require('../app/models/userModel');
    require('../app/models/producerModel');
    require('../app/models/productModel');
    require('../app/models/itemKeyModel');
    return db;
};