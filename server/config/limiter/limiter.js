const expressLimiter = require('express-limiter');

const config = (expressApp, redisClient) => expressLimiter(expressApp, redisClient);

module.exports = {
  config,
};
