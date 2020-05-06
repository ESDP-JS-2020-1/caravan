const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: true
    },
    carVolume: {
        type: String,
        required: true
    },
    carRefrigerator: {
        type: Boolean,
        required: true
    },
});

module.exports = marketSchema;