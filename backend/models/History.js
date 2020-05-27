const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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


const History = mongoose.model('History', HistorySchema);

module.exports = History;