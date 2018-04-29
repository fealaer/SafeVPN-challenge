const returnError = require('../returnError');
const handleError = require('../../helpers/handleError');

jest.mock('../../helpers/handleError');
handleError.mockImplementation((error) => {
  const err = error;
  err.status = 500;
  return err;
});

test('should return status and render json with error', () => {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  };
  const msg = 'Test error message';
  const error = new Error(msg);
  returnError(error, null, res);
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({
    error: {
      name: error.name,
      message: error.message,
      status: error.status,
    },
  });
});

test('should render json with validation error details if it is a validation error', () => {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  };
  const msg = 'Test error message';
  const error = new Error(msg);
  error.name = 'ValidationError';
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
  returnError(error, null, res);
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({
    error: {
      name: error.name,
      message: error.message,
      status: error.status,
      errors: error.errors,
    },
  });
});
