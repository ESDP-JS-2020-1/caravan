const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }]
});

module.exports = mongoose.model('Group', GroupSchema);