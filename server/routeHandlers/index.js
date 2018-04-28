const notFound = require('./notFound');
const publicRoutes = require('./public');

module.exports = app => {
  publicRoutes(app);

  app.use(notFound);
};
