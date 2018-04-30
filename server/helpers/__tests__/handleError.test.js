const errorHandler = require('../handleError');
const logger = require('../../logger');

jest.mock('../../logger');

let error;
beforeEach(() => {
  const message = 'This is a test error';
  const code = 'ESOMECODE';
  error = new Error(message);
  error.code = code;
  error.errors = [
    {
      location: 'query',
      param: 'coupon',
      value: [
        'Saab',
        'Audi',
      ],
      msg: 'Invalid value',
    },
  ];
});

test('should log error with level error', () => {
  errorHandler(error);
  expect(logger.error).toHaveBeenCalledWith(`${error.status} - ${error.code} - ${error.stack}`);
});

test('should log error with status < 500 with level warn', () => {
  error.status = 400;
  errorHandler(error);
  expect(logger.warn).toHaveBeenCalledWith(`${error.status} - ${error.code} - ${error.stack}`);
});

test('should log error validation error with validation details', () => {
  error.status = 400;
  error.name = 'ValidationError';
  errorHandler(error);
  expect(logger.warn).toHaveBeenCalledWith(`${error.status} - ${error.code} - ${error.name}: ${error.message} - ${JSON.stringify(error.errors)}`);
});

test('should not log.error not found error', () => {
  error.status = 404;
  error.name = 'NotFoundError';
  errorHandler(error);
  expect(logger.warn).not.toHaveBeenCalled();
  expect(logger.error).not.toHaveBeenCalled();
});
