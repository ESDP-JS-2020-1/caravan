const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comment: String,
    type: {
        type: String,
        enum: ['edit', 'delete', 'add']
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const History = mongoose.model('History', HistorySchema);

module.exports = History;