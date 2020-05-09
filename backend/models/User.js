const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;

const MarketSchema = require('./Roles/Market');
const CourierSchema = require('./Roles/Courier');

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    phone: {
      type: String,
      required: true
    },
    courier: {
        type: CourierSchema,
        required: function() {
            return this.role === 'courier'
        }
    },
    market: {
        type: MarketSchema,
        required: function() {
            return this.role === 'market'
        }
    },
    role: {
        type: String,
        enum: ['courier', 'admin', 'operator', 'market'],
        default: 'market'
    },
    avatar: String
});

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_FACTOR);

    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.token;
        return ret;
    }
});

UserSchema.methods.addToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;