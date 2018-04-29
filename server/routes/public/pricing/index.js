const couponValidator = require('../../../middlewares/validators/coupon').inQuery;
const { getLimiter } = require('../../../config/limiter/limiter');
const handleValidationErrors = require('../../../middlewares/handleValidationErrors');
const handleRequestWithCache = require('../../../middlewares/handleRequestWithCache');
const get = require('./get');

module.exports = (app) => {
  app.get('/pricing', getLimiter(app)({
    path: '/pricing',
    method: 'get',
    lookup: ['connection.remoteAddress', 'headers.x-forwarded-for'],
    // 150 requests per hour
    total: 150,
    expire: 1000 * 60 * 60,
  }), couponValidator, handleValidationErrors, handleRequestWithCache('query', 'coupon'), get);
};
