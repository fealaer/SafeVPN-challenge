const index = require('../index');
const limiter = require('../../../../config/limiter/limiter');
const couponValidator = require('../../../../middlewares/validators/coupon').inQuery;
const handleValidationErrors = require('../../../../middlewares/handleValidationErrors');
const get = require('../get');

limiter.getLimiter = jest.fn();

test('should set up pricing get route', () => {
  const app = {
    get: jest.fn(),
  };
  index(app);
  expect(app.get).toHaveBeenCalledWith('/pricing', expect.any(Function), couponValidator, handleValidationErrors, expect.any(Function), get);
});
