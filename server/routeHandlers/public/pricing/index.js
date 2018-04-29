const couponValidator = require('../../../middlewares/validators/coupon').inQuery;
const handleValidationErrors = require('../../../middlewares/handleValidationErrors');
const get = require('./get');

module.exports = (app) => {
  app.get('/pricing', [couponValidator, handleValidationErrors], get);
};
