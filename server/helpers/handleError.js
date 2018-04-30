const logger = require('../logger');
const isValidationError = require('../helpers/isValidationError');
const isNotFoundError = require('../helpers/isNotFoundError');

const formatValidationDetails = error =>
  `${error.name}: ${error.message} - ${JSON.stringify(error.errors)}`;

const chooseDetails = error =>
  (isValidationError(error) ? formatValidationDetails(error) : error.stack);

const chooseLevel = error => (error.status < 500 ? 'warn' : 'error');

const format = (error, details) => `${error.status} - ${error.code} - ${details}`;

module.exports = (error) => {
  const err = error;
  if (!isNotFoundError(error)) {
    err.status = err.status || 500;
    const level = chooseLevel(error);
    logger[level](format(err, chooseDetails(error)));
  }
  return err;
};
