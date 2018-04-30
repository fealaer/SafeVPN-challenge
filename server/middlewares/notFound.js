module.exports = (req, res, next) => {
  const err = new Error('The endpoint has not been found!');
  err.name = 'NotFoundError';
  err.status = 404;
  next(err);
};
