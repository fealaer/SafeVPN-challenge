const logger = require('../logger');

const format = error => `${error.status} - ${error.code} - ${error.stack}`;

module.exports = error => {
  error.status = error.status || 500;
  logger.error(format(error));
  return error;
};
