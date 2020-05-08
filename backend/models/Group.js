const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Group', GroupSchema);