const handleError = require('../helpers/handleError');

module.exports = (err, req, res) => {
  const error = handleError(err);
  res.status(error.status);
  res.json({
    error: {
      name: error.name,
      message: error.message,
      status: error.status,
    }
  });
};
