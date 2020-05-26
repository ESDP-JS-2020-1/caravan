const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NominatedRequestSchema = new Schema({
    courier: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isRemoved: {
        type: Boolean,
        required: true,
        default: false
    },
    request: {
        type: Schema.Types.ObjectId,
        ref: 'Request',
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const NominatedRequest = mongoose.model('NominatedRequest', NominatedRequestSchema);

module.exports = NominatedRequest;