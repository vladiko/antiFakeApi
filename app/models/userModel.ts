import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
var Schema = mongoose.Schema;
export interface IUserModel extends mongoose.Document {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    salt: string,
    provider: string,
    providerId: string,
    providerData: Object,
    created: Date,
    role: number,
    fullName: string,
    hashPassword: (password: string) => string,
    authenticate: (password: string) => boolean
}

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return password && password.length > 3;
            }, 'Password should be longer'
        ]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    },
    role: {
        type: Number,
        required: 'User Role is required'
    }
});
UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});
UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new
            Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});
UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000,
        64).toString('base64');
};
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};
UserSchema.statics.findUniqueUsername = function (username, suffix,
    callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) +
                    1, callback);
            }
        } else {
            callback(null);
        }
    });
};
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});
mongoose.model('User', UserSchema);
export var userModel = mongoose.model<IUserModel>("User", UserSchema);

