const PricingData = require('../../../models/pricingData');
const redis = require('../../../config/cache/redis');
const handleError = require('../../../helpers/handleError');

module.exports = (req, res, next) => {
  const couponName = req.query.coupon || '';
  return PricingData
    .findOne({ couponName })
    .select({ couponName: 1, pricingData: 1, createdAt: 1 })
    .lean()
    .exec()
    .then((pricingData) => {
      let result = {};
      if (pricingData) {
        result = pricingData;
        delete result._id; // eslint-disable-line no-underscore-dangle
        result.createdAt = result.createdAt.toISOString();
      }
      const key = ['query', 'coupon', couponName].join(':');
      redis
        .setex(key, 3600, JSON.stringify(result))
        .catch(handleError);
      res.json(result);
    })
    .catch(next);
};
