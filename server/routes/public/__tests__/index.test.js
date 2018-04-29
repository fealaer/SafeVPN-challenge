const index = require('../index');
const pricing = require('../pricing');

jest.mock('../pricing');

test('should set up pricing routes', () => {
  const app = {};
  const limiter = {};
  index(app, limiter);
  expect(pricing).toHaveBeenCalledWith(app, limiter);
});
