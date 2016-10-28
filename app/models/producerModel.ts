import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
var Schema = mongoose.Schema;
export interface IProducerModel extends mongoose.Document {
    companyName: string;
    address: string;
    email: string;
    uniqShortProducerName: string;
    created: Date;
}
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
export var model = mongoose.model<IProducerModel>("Producer", ProducerSchema);

