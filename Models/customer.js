const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  location: { lat: Number, long: Number },
});

module.exports = mongoose.model('Customer', customerSchema);
