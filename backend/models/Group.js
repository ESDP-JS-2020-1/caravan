const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

module.exports = mongoose.model('Group', GroupSchema);