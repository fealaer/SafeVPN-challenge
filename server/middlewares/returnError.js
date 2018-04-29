const isValidationError = require('../helpers/isValidationError');
const handleError = require('../helpers/handleError');

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const error = handleError(err);
  res.status(error.status);
  const result = {
    error: {
      name: error.name,
      message: error.message,
      status: error.status,
    },
  };
  if (isValidationError(err)) {
    result.error.errors = err.errors;
  }
  res.json(result);
};
