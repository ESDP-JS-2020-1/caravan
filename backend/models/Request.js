const mongoose = require('mongoose');
const addToHistory = require('../plugins/addToHistory');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isRemoved: {
        type: Boolean,
        required: true,
        default: false
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

const schemaName = 'Request';

RequestSchema.plugin(addToHistory, {schemaName});
RequestSchema.plugin(aggregatePaginate);
const Request = mongoose.model(schemaName, RequestSchema);

module.exports = Request;