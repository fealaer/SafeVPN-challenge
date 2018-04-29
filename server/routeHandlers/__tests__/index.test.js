const index = require('../index');
const publicRoutes = require('../public');

jest.mock('../public');

test('should set up public routes', () => {
  const app = {};
  index(app);
  expect(publicRoutes).toHaveBeenCalledWith(app);
});
