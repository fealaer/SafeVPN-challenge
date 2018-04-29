const pricing = require('./pricing');

module.exports = (app, limiter) => {
  pricing(app, limiter);
};
