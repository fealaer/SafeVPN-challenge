const errorHandler = require('../handleError');
const logger = require('../../logger');

jest.mock('../../logger');

let error;
beforeEach(() => {
  const message = 'This is a test error';
  const code = 'ESOMECODE';
  error = new Error(message);
  error.code = code;
});

test('should log error with level error', () => {
  errorHandler(error);
  expect(logger.error).toHaveBeenCalledWith(`${error.status} - ${error.code} - ${error.stack}`);
});
