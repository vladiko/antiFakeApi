"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    productName: {
        type: String,
        required: 'product name is required',
        trim: true
    },
    uniqShortProductName: {
        type: String,
        unique: true,
        required: 'uniq short product name is required',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer'
    }
});
ProductSchema.set('toJSON', {
    getters: true,
    virtuals: true
});
mongoose.model('Product', ProductSchema);
//# sourceMappingURL=productModel.js.map