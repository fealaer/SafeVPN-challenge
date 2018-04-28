const index = require('../index');
const pricing = require('../pricing');

jest.mock('../pricing');

test('should set up pricing routes', () => {
  const app = {};
  index(app);
  expect(pricing).toHaveBeenCalledWith(app);
});
