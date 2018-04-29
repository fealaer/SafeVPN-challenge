const index = require('../index');
const publicRoutes = require('../public');

jest.mock('../public');

test('should set up public routes', () => {
  const app = {};
  const limiter = {};
  index(app, limiter);
  expect(publicRoutes).toHaveBeenCalledWith(app, limiter);
});
