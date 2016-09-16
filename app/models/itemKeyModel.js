"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ItemKeySchema = new Schema({
    uuid: {
        type: String,
        required: 'uuid is required',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: 'product is requered for item key'
    },
    wasOpen: {
        type: Boolean,
        default: false
    },
    data: String,
    itemSerial: String
});
ItemKeySchema.set('toJSON', {
    getters: true,
    virtuals: true
});
mongoose.model('ItemKey', ItemKeySchema);
