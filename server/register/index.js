const requestLogger = require('./morgan').logger;
const logger = require('./winston');

module.exports = {
  requestLogger,
  logger,
};
