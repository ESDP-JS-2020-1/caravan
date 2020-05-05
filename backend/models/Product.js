const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: String,
        required: true
    },
    price: {
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