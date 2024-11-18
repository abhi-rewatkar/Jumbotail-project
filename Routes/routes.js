const express = require('express');
const { getNearestWarehouse } = require('../Controllers/warehouseController');
const { getShippingCharge } = require('../Controllers/shippingController');
const { calculateShipping } = require('../Controllers/combinedController');

const router = express.Router();

router.get('/warehouse/nearest', getNearestWarehouse);
router.get('/shipping-charge', getShippingCharge);
router.get('/shipping-charge/calculate', calculateShipping);

module.exports = router;
