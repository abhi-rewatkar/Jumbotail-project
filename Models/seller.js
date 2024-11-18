const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: String,
  products: [
    {
      name: String,
      price: Number,
      attributes: { weight: Number, dimension: String },
    },
  ],
  location: { lat: Number, long: Number },
});

module.exports = mongoose.model('Seller', sellerSchema);

