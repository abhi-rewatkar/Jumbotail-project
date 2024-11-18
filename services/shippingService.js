const { calculateDistance } = require('./distanceCalculator');

const calculateShippingCharge = (distance, weight, deliverySpeed) => {
  let ratePerKm;

  if (distance > 500) ratePerKm = 1; // Aeroplane
  else if (distance > 100) ratePerKm = 2; // Truck
  else ratePerKm = 3; // Mini Van

  let baseCharge = distance * weight * ratePerKm;
  const courierCharge = 10;

  if (deliverySpeed === 'express') baseCharge += weight * 1.2;
  const ans = baseCharge + courierCharge;
  return parseInt(ans);
};

module.exports = { calculateShippingCharge };
