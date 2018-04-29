const handleValidationErrors = require('../handleValidationErrors');
const { validationResult } = require('express-validator/check');

jest.mock('express-validator/check');
const errors = [
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
const result = {
  isEmpty: jest.fn().mockImplementation(() => result.req.isEmpty),
  array: jest.fn().mockImplementation(() => errors),
};
validationResult.mockImplementation((req) => {
  result.req = req;
  return result;
});

const next = jest.fn();
beforeEach(() => {
  next.mockClear();
  validationResult.mockClear();
  result.array.mockClear();
  result.isEmpty.mockClear();
});

test('should call next without errors if validation errors are empty', () => {
  handleValidationErrors({ isEmpty: true }, {}, next);
  expect(next).toHaveBeenCalledWith();
});

test('should next with errors if validation errors are not empty', () => {
  const error = new Error('Invalid Input Data');
  error.status = 400;
  error.name = 'ValidationError';
  error.code = 'EVALIDATION';
  error.errors = errors;
  handleValidationErrors({ isEmpty: false }, {}, next);
  expect(next).toHaveBeenCalledWith(error);
});
