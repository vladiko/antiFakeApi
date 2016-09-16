"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProduserSchema = new Schema({
    companyName: {
        type: String,
        required: 'Provider is required'
    },
    Address: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    uniqShortProduserName: {
        type: String,
        unique: true,
        required: 'Produsername is required',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
//ProduserSchema.virtual('fullName').get(function () {
//    return this.firstName + ' ' + this.lastName;
//}).set(function (fullName) {
//    var splitName = fullName.split(' ');
//    this.firstName = splitName[0] || '';
//    this.lastName = splitName[1] || '';
//});
//ProduserSchema.pre('save', function (next) {
//    if (this.password) {
//        this.salt = new
//            Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
//        this.password = this.hashPassword(this.password);
//    }
//    next();
//});
//ProduserSchema.methods.hashPassword = function (password) {
//    return crypto.pbkdf2Sync(password, this.salt, 10000,
//        64).toString('base64');
//};
//ProduserSchema.methods.authenticate = function (password) {
//    return this.password === this.hashPassword(password);
//};
//ProduserSchema.statics.findUniqueProdusername = function (username, suffix,
//    callback) {
//    var _this = this;
//    var possibleProdusername = username + (suffix || '');
//    _this.findOne({
//        username: possibleProdusername
//    }, function (err, user) {
//        if (!err) {
//            if (!user) {
//                callback(possibleProdusername);
//            } else {
//                return _this.findUniqueProdusername(username, (suffix || 0) +
//                    1, callback);
//            }
//        } else {
//            callback(null);
//        }
//    });
//};
ProduserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});
mongoose.model('Produser', ProduserSchema);
