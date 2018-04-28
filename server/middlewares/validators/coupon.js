const { query } = require('express-validator/check');

const inQuery = query('coupon').optional().isString().trim().escape();

module.exports = {
  inQuery,
};
