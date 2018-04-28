const notFound = require('../notFound');

test('should return status 404 and render message \'Not found!\'', () => {
  const res = {
    status: jest.fn(),
    send: jest.fn(),
  };
  notFound(null, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.send).toHaveBeenCalledWith('Not found!');
});
