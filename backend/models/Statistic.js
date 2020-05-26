const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
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
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const Statistic = mongoose.model('Statistic', StatisticSchema);

module.exports = Statistic;