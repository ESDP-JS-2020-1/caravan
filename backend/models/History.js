const mongoose = require('mongoose');

const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const HistorySchema = new mongoose.Schema({
    user: {
        displayName: {
            type: String,
            required: true
        }
    },
    info: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        enum: ['edit', 'delete', 'add']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

HistorySchema.plugin(aggregatePaginate);

const History = mongoose.model('History', HistorySchema);

module.exports = History;