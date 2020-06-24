const mongoose = require('mongoose');
const addToHistory = require('../plugins/addToHistory');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    isRemoved: {
        type: Boolean,
        required: true,
        default: false
    },
    price: {
        type: Number,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    isRefrigeratorRequired: {
        type: Boolean,
        default: false
    },
    image: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const schemaName = 'Product';

ProductSchema.plugin(addToHistory, {schemaName});

const Product = mongoose.model(schemaName, ProductSchema);

module.exports = Product;