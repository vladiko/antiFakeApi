import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;
var ItemKeySchema = new Schema({
    uuid: {
        type: String,
        required: 'uuid is required',
        trim: true,
        index: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    product:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: 'product is requered for item key',
    },
    wasOpen: {
        type: Boolean,
        default: false
    },
    openDate: Date,
    checkCounter: {
        type: Number,
        default: 0
    },
    serial: String,
    data: String
});

ItemKeySchema.set('toJSON', {
    getters: true,
    virtuals: true
});
mongoose.model('ItemKey', ItemKeySchema);