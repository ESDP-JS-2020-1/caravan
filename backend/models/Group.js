const mongoose = require('mongoose');
const addToHistory = require('../plugins/addToHistory');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isRemoved: {
        type: Boolean,
        required: true,
        default: false
    },
    list: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        }
    }],
    permissions: [String]
});

GroupSchema.plugin(addToHistory)

module.exports = mongoose.model('Group', GroupSchema);