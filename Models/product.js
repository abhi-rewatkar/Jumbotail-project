const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    sellingPrice: Number,
    attributes: { weight: Number, dimensions: String },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
});

module.exports = mongoose.model('Product', productSchema);
