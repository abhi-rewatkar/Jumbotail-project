// importing the models
const Customer = require('../Models/customer');
const Warehouse = require('../Models/warehouse');
const { calculateShippingCharge } = require('../services/shippingService');
const { calculateDistance } = require('../services/distanceCalculator');

const getShippingCharge = async (req, res, next) => {
  try {
    //getting data from the request
    const { warehouseId, customerId, deliverySpeed } = req.query;

    //finding the data in database
    const warehouse = await Warehouse.findById(warehouseId);
    const customer = await Customer.findById(customerId);
    const extractwarehouse = JSON.stringify(warehouse);
    const Location = JSON.parse(extractwarehouse);
    // console.log(Location.warehouseLocation);   



    //calculating the operations (distance and shipping charges)
    const distance = calculateDistance(Location.warehouseLocation, customer.location);

    const shippingCharge = calculateShippingCharge(distance, 1, deliverySpeed);
    // console.log(distance, shippingCharge);

    //returning the response
    res.status(200).json({ shippingCharge });
  } catch (err) {
    //returning the error if occurs
    res.status(400).json({ Error : err});
  }
};

//exporting the module
module.exports = { getShippingCharge };


// /api/v1/shipping-charge?warehouseId=789&customerId=456&deliverySpeed=express