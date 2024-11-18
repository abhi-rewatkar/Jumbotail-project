//importing the controllers
const { getwarehouse } = require('./warehouseController');
const { getShippingCharge } = require('./shippingController');


const calculateShipping = async (req, res) => {
    //getting data from request
    const { sellerId, customerId,productId, deliverySpeed } = req.body;
    // console.log(sellerId, customerId,productId, deliverySpeed);

    //calculating the nearest warehouse and shipping charges
    const nearestWarehouse = await getwarehouse(sellerId,productId);
    const shippingCharge = await getShippingCharge(req, res);

    res.json({
        shippingCharge,
        nearestWarehouse,
    });
};

module.exports = { calculateShipping };
