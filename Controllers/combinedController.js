//importing the controllers
const { getwarehouse } = require('./warehouseController');
const { getShippingCharge } = require('./shippingController');


const calculateShipping = async (req, res) => {
    const { sellerId, customerId,productId, deliverySpeed } = req.body;

    const nearestWarehouse = await getwarehouse(sellerId,productId);
    if (!nearestWarehouse) {
        return res.status(404).json({ msg: "No warehouse found for the provided seller and product" });
      }

    const shippingCharge = await getShippingCharge(req, res);

    res.json({
        shippingCharge,
        nearestWarehouse,
    });
};

module.exports = { calculateShipping };
