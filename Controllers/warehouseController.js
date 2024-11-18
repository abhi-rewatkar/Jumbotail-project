// //importing the warehouse model
// const Warehouse = require('../models/warehouse');
// const { calculateDistance } = require('../services/distanceCalculator');

// const getNearestWarehouse = async (req, res, next) => {
//   try {
//     //getting the data from request
//     const { sellerLat, sellerLong } = req.query;

//     //if it is not there then it will send an error
//     if (!sellerLat || !sellerLong) {
//         res.status(400).json({ msg :"location not found" });
//     }

//     // finding the warehouse in database
//     const warehouses = await Warehouse.find();

//     //getting the location of an warehouse
//     const nearestWarehouse = warehouses.reduce((prev, curr) => {
//       const prevDistance = calculateDistance({ lat: sellerLat, long: sellerLong }, prev.location);
//       const currDistance = calculateDistance({ lat: sellerLat, long: sellerLong }, curr.location);
//       return currDistance < prevDistance ? curr : prev;
//     });

//     //returning the response
//     res.status(200).json({ nearestWarehouse });
//   } catch (err) {
//     //returning the error if occurs
//     res.status(400).json({ Error : err});
//   }
// };

// ////exporting the controller
// module.exports = { getNearestWarehouse };


// Import necessary modules
const Warehouse = require('../Models/warehouse');
const Seller = require('../Models/seller'); // Assume this model stores seller details
const Product = require('../Models/product'); // Assume this model stores product details
const { calculateDistance } = require('../services/distanceCalculator');

const getNearestWarehouse = async (req, res, next) => {
  try {
    // Extract sellerId and productId from query parameters
    const { sellerId, productId } = req.query;
    // Validate required parameters
    if (!sellerId || !productId) {
      return res.status(400).json({ msg: "Missing required parameters: sellerId and productId" });
    }

    // Fetch seller details to get their location
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ msg: "Seller not found" });
    }

    const sellerLocation = seller.location; // { lat: 11.232, lng: 23.445495 }
    
    // Fetch all warehouses
    const warehouses = await Warehouse.find();

    // console.log("location ", sellerLocation, "warehouse", warehouses);
    if (!warehouses || warehouses.length === 0) {
      return res.status(404).json({ msg: "No warehouses available" });
    }

    // Find the nearest warehouse
    const nearestWarehouse = warehouses.reduce((prev, curr) => {
      const prevDistance = calculateDistance(sellerLocation, prev.location);
      const currDistance = calculateDistance(sellerLocation, curr.location);
      return currDistance < prevDistance ? curr : prev;
    });

    // console.log("nearest",nearestWarehouse.warehouseLocation);
   
    // Send the response.
    res.status(200).json({
      warehouseId: nearestWarehouse._id,
      nearestWarehouse: nearestWarehouse,
    });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ error: err.message });
  }
};

// Export the controller
module.exports = { getNearestWarehouse };