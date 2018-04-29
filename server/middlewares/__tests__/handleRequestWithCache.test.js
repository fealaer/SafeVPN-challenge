const handleRequestWithCache = require('../handleRequestWithCache');
const redis = require('../../config/cache/redis');
const handleError = require('../../helpers/handleError');

jest.mock('../../helpers/handleError');

redis.get = jest.fn();

const handler = handleRequestWithCache('query', 'coupon');

const req = {
  query: {
    coupon: null,
  },
};
const res = {
  json: jest.fn(),
};
const next = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
});

test('should get cache data from redis and return it to user', () => {
  const data = { data: 'somedata' };
  redis.get.mockResolvedValue(JSON.stringify(data));
  handler(req, res, next).then(() => expect(res.json).toHaveBeenCalledWith(data));
});

test('should call empty next if cache does not have data', () => {
  redis.get.mockResolvedValue(null);
  handler(req, res, next).then(() => expect(next).toHaveBeenCalledWith());
});

test('should call empty next and handleError if cache return error', () => {
  const error = new Error();
  redis.get.mockRejectedValue(error);
  handler(req, res, next).then(() => {
    expect(next).toHaveBeenCalledWith();
    expect(handleError).toHaveBeenCalledWith(error);
  });
});
