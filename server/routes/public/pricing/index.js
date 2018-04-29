const couponValidator = require('../../../middlewares/validators/coupon').inQuery;
const handleValidationErrors = require('../../../middlewares/handleValidationErrors');
const handleRequestWithCache = require('../../../middlewares/handleRequestWithCache');
const get = require('./get');

module.exports = (app) => {
  app.get('/pricing', couponValidator, handleValidationErrors, handleRequestWithCache('query', 'coupon'), get);
};
