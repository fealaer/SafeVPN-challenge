const publicRoutes = require('./public');

module.exports = (app, limiter) => publicRoutes(app, limiter);
