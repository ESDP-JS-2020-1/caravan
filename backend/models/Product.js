const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;