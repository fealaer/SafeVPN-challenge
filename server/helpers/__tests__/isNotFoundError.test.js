const isNotFoundError = require('../isNotFoundError');

test('should return true if it is a not found error', () => {
  const error = new Error();
  error.name = 'NotFoundError';
  expect(isNotFoundError(error)).toBe(true);
});
test('should return false if it is not a not found error', () => {
  const error = new Error();
  expect(isNotFoundError(error)).toBe(false);
});
