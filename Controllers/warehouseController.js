// Import necessary modules
const Warehouse = require('../Models/warehouse');
const Seller = require('../Models/seller'); // Assume this model stores seller details
const Product = require('../Models/product'); // Assume this model stores product details
const { calculateDistance } = require('../services/distanceCalculator');

const getwarehouse = async(sellerId,productId) => {
  try {
    // console.log("sellerId",sellerId,"productI",productId);
      if (!sellerId || !productId) {
        return res.status(400).json({ msg: "Missing required parameters: sellerId and productId" });
      }
    // Fetch seller details to get their location
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      console.log("seller not found");
    }

    const sellerLocation = seller.location;
    const warehouses = await Warehouse.find();
    // console.log("warehouses",sellerLocation);
   
    if (!warehouses || warehouses.length === 0) {
      console.log("No warehouses available");
    }

    const nearestWarehouse = warehouses.reduce((prev, curr) => {
      const prevDistance = calculateDistance(sellerLocation, prev.location);
      const currDistance = calculateDistance(sellerLocation, curr.location);
      return currDistance < prevDistance ? curr : prev;
    });

    const extractwarehouse = JSON.stringify(nearestWarehouse);
    const Location = JSON.parse(extractwarehouse);
    // console.log("Lic",Location.warehouseLocation);
    return Location.warehouseLocation;
    
  } catch (err) {
    console.log(err);
  }
};

const getNearestWarehouse = async (req, res, next) => {
  try {
    // Extract sellerId and productId from query parameters
    const { sellerId, productId } = req.query;


    console.log(sellerId, productId);
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

    const extractwarehouse = JSON.stringify(nearestWarehouse);
    const Location = JSON.parse(extractwarehouse);

    
    // Send the response.
    res.status(200).json({
      warehouseId: nearestWarehouse._id,
      nearestWarehouse: Location.warehouseLocation,
    });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ error: err.message });
  }
};

// Export the controller
module.exports = { getNearestWarehouse, getwarehouse};