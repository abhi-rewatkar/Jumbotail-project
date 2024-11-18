//importing the controllers
const Seller = require('../Models/seller');
const Warehouse = require('../Models/warehouse');
const Customer = require('../Models/customer');
const { calculateDistance } = require('./../services/distanceCalculator');
const { calculateShippingCharge } = require('../services/shippingService');


const getwarehouse = async(sellerId, productId) => {
    try {
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

      return Location._id;
      
    } catch (err) {
      console.log(err);
    }
};

const getShippingCharge = async ( warehouseId, customerId, deliverySpeed ) => {
  try {
    const warehouse = await Warehouse.findById(warehouseId);
    const customer = await Customer.findById(customerId);
    const extractwarehouse = JSON.stringify(warehouse);
    const Location = JSON.parse(extractwarehouse);

    const distance = calculateDistance(Location.warehouseLocation, customer.location);
    const shippingCharge = calculateShippingCharge(distance, 1, deliverySpeed);
  
    return shippingCharge;
  } catch (err) {
    console.log(err);
  }
};

const calculateShipping = async (req, res) => {
    const { sellerId, customerId, productId, deliverySpeed } = req.body;

    const nearestWarehouse = await getwarehouse(sellerId, productId);
    
    if (!nearestWarehouse) {
        return res.status(404).json({ msg: "No warehouse found for the provided seller and product" });
      }

    const shippingCharge = await getShippingCharge( nearestWarehouse, customerId, deliverySpeed );
    console.log("AAAAAAAA shippingCharge", shippingCharge)

    res.json({
        shippingCharge,
        nearestWarehouse,
    });
};

module.exports = { calculateShipping };
