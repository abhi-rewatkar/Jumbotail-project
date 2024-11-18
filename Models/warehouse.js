const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: String,
  location: { lat: Number, long: Number },
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
