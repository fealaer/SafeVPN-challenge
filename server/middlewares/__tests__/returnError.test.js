const returnError = require('../returnError');
const handleError = require('../../helpers/handleError');

jest.mock('../../helpers/handleError');
handleError.mockImplementation(error => {
  error.status = 500;
  return error;
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
    }
  });
});
