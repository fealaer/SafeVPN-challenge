const expressLimiter = require('express-limiter');
const redis = require('../cache/redis');

let limiter;

const config = (expressApp, redisClient) => {
  limiter = expressLimiter(expressApp, redisClient);
  return limiter;
};

const getLimiter = app => limiter || config(app, redis.getClient());

module.exports = {
  config,
  getLimiter,
};

