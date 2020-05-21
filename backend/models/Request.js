const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        amount: {
            type: String,
            required: true
        }
    }],
    comment: String,
    status: {
        type: String,
        enum: ['pending', 'performed', 'closed'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

RequestSchema.virtual('type').get(function () {
console.log(this)
})

RequestSchema.pre('validate', function (next) {
    console.log(this )
})

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;