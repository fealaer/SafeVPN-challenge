const { normalResponseLogger, clientErrorsLogger, serverErrorsLogger } = require('./morgan');
const logger = require('./winston');

module.exports = {
  normalResponseLogger,
  clientErrorsLogger,
  serverErrorsLogger,
  logger,
};
