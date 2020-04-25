const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    products: [
        {name: String, amount: String, price: String}
    ]
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;