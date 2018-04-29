const redis = require('../config/cache/redis');
const handleError = require('../helpers/handleError');

module.exports = (location, param) => (req, res, next) => {
  const value = req[location][param] || '';
  const key = [location, param, value].join(':');
  return redis
    .get(key)
    .then((data) => {
      if (data != null) {
        res.json(JSON.parse(data));
      } else {
        next();
      }
    })
    .catch((err) => {
      handleError(err);
      next();
    });
};
