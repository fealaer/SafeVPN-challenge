const index = require('../index');
const couponValidator = require('../../../../middlewares/validators/coupon').inQuery;
const handleValidationErrors = require('../../../../middlewares/handleValidationErrors');
const get = require('../get');

test('should set up pricing get route', () => {
  const app = {
    get: jest.fn(),
  };
  index(app);
  expect(app.get).toHaveBeenCalledWith('/pricing', [couponValidator, handleValidationErrors], get);
});
