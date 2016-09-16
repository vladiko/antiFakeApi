import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
var Schema = mongoose.Schema;
export var ProducerSchema = new Schema({
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
module.exports = ProducerSchema;
ProducerSchema.set('toJSON', {
    getters: true,
    virtuals: true
});
mongoose.model('Producer', ProducerSchema);