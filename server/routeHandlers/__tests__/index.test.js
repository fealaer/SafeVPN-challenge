const index = require('../index');
const notFound = require('../notFound');
const publicRoutes = require('../public');

jest.mock('../public');

let app;
beforeEach(() => {
  app = {
    use: jest.fn()
  };
});
test('should set up public routes', () => {
  index(app);
  expect(publicRoutes).toHaveBeenCalledWith(app);
});

test('should set up not found handler', () => {
  index(app);
  expect(app.use).toHaveBeenCalledWith(notFound);
});
