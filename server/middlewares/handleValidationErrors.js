const { validationResult } = require('express-validator/check');

module.exports = (req, res, next) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    const error = new Error('Invalid Input Data');
    error.status = 400;
    error.name = 'ValidationError';
    error.code = 'EVALIDATION';
    error.errors = validationRes.array();
    next(error);
  } else {
    next();
  }
};
