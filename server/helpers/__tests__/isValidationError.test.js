const isValidationError = require('../isValidationError');

test('should return true if it is a validation error', () => {
  const error = new Error();
  error.name = 'ValidationError';
  expect(isValidationError(error)).toBe(true);
});
test('should return false if it is not a validation error', () => {
  const error = new Error();
  expect(isValidationError(error)).toBe(false);
});
