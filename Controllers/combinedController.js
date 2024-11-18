//importing the controllers
const { getNearestWarehouse } = require('./warehouseController');
const { getShippingCharge } = require('./shippingController');


const calculateShipping = async (req, res) => {
    //getting data from request
    const { sellerId, customerId, deliverySpeed } = req.body;

    //calculating the nearest warehouse and shipping charges
    const nearestWarehouse = await getNearestWarehouse(req, res);
    const shippingCharge = await getShippingCharge(req, res);

    res.json({
        shippingCharge,
        nearestWarehouse,
    });
};

module.exports = { calculateShipping };
