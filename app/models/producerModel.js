"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
exports.ProducerSchema = new Schema({
    companyName: {
        type: String,
        required: 'Provider is required'
    },
    address: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    uniqShortProducerName: {
        type: String,
        unique: true,
        required: 'Producername is required',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = exports.ProducerSchema;
exports.ProducerSchema.set('toJSON', {
    getters: true,
    virtuals: true
});
mongoose.model('Producer', exports.ProducerSchema);
exports.model = mongoose.model("Producer", exports.ProducerSchema);
//# sourceMappingURL=producerModel.js.map