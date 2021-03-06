const isProduction = require('../isProduction');

test('should return true if env is production', () => {
  process.env.NODE_ENV = 'production';
  expect(isProduction()).toBe(true);
});
test('should return false if env is not production', () => {
  process.env.NODE_ENV = 'test';
  expect(isProduction()).toBe(false);
});
