const index = require('../index');
const couponValidator = require('../../../../middlewares/validators/coupon').inQuery;
const handleValidationErrors = require('../../../../middlewares/handleValidationErrors');
const handleRequestWithCache = require('../../../../middlewares/handleRequestWithCache');
const get = require('../get');

const cacheMiddleware = {};
jest.mock('../../../../middlewares/handleRequestWithCache');
handleRequestWithCache.mockReturnValue(cacheMiddleware);

test('should set up pricing get route', () => {
  const app = {
    get: jest.fn(),
  };
  const limiterMiddleware = {};
  const limiter = jest.fn().mockReturnValue(limiterMiddleware);
  index(app, limiter);
  expect(app.get)
    .toHaveBeenCalledWith('/pricing', limiterMiddleware, couponValidator, handleValidationErrors, cacheMiddleware, get);
});
