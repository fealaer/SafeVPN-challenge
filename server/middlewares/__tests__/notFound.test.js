const notFound = require('../notFound');

test('should call next with Error', () => {
  const next = jest.fn();
  notFound(null, null, next);
  expect(next).toHaveBeenCalled();
  const error = next.mock.calls[0][0];
  expect(error instanceof Error).toBe(true);
  expect(error.status).toBe(404);
  expect(error.name).toBe('Not Found');
  expect(error.message).toBe('The endpoint has not been found!');
});
