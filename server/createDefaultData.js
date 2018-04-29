const path = require('path');

process.env.NODE_CONFIG_DIR = path.join(__dirname, './config/env');

const mongoose = require('./config/data/mongoose');
const Coupon = require('./models/coupon');
const PricingData = require('./models/pricingData');
const logger = require('./logger');
const handleError = require('./helpers/handleError');

/* eslint-disable */
const createDefaultCoupon = () => Coupon
  .count()
  .lean()
  .exec()
  .then((rows) => {
    if (rows) {
      return;
    }
    return Promise
      .all(['test', '']
        .map(name => new Coupon({ name }))
        .map(coupon => coupon.save())
      )
      .then(() => logger.info('Default Coupon entities have been created'));
  })
  .catch(handleError);

const createDefaultPricingData = () => PricingData
  .count()
  .lean()
  .exec()
  .then((rows) => {
    if (rows) {
      return;
    }
    return Promise
      .all(['test', '']
        .map((couponName, index) => new PricingData({
          couponName,
          pricingData: { price: index * 1000 },
        }))
        .map(pricingData => pricingData.save())
      )
      .then(() => logger.info('Default PricingData entities have been created'));
  })
  .catch(handleError);
/* eslint-enable */

mongoose.connection.on('connected', () => {
  Promise
    .all([
      createDefaultCoupon(),
      createDefaultPricingData(),
    ])
    .then(() => {
      mongoose.connection.close();
    });
});
