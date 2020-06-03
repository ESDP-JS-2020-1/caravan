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
    permissions: [String],
    date: {
        type: Date,
        default: Date.now
    }
});

const schemaName = 'Group';

GroupSchema.plugin(addToHistory, {schemaName});

module.exports = mongoose.model(schemaName, GroupSchema);