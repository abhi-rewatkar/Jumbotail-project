const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    sellingPrice: Number,
    attributes: { weight: Number, dimensions: String },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
});

module.exports = mongoose.model('Product', productSchema);



// {{
//     "name": "iphone",
//     "sellingPrice": 200,
//     "attributes": { weight: 2, dimensions: "222" },
//     "sellerId": {"name": 'Test Seller',
//     "location": { "lat": 12.99999, "long": 37.923273 }},
// }}