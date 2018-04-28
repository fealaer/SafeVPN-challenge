const couponValidator = require('../../../middlewares/validators/coupon').inQuery;
const get = require('./get');

module.exports = (app) => {
  app.get('/pricing', couponValidator, get);
};
