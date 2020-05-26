const mongoose = require('mongoose');

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
        type: String,
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
    image: String
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;