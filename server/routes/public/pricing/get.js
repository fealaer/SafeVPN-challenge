const PricingData = require('../../../models/pricingData');

module.exports = (req, res, next) => {
  const couponName = req.query.coupon || '';
  return PricingData
    .findOne({ couponName })
    .select({ couponName: 1, pricingData: 1, createdAt: 1 })
    .lean()
    .exec()
    .then((coupon) => {
      let result = {};
      if (coupon) {
        result = coupon;
        delete result._id; // eslint-disable-line no-underscore-dangle
        result.createdAt = result.createdAt.toISOString();
      }
      res.json(result);
    })
    .catch(next);
};
