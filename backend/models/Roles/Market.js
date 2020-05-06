const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    coordinates: {
        type: Object,
        required: true
    }
});

module.exports = marketSchema;