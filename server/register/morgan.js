const morgan = require('morgan');
const { stream } = require('./winston');
const isProduction = require('../helpers/isProduction');

const prodFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"';
const devFormat = 'dev';

const logger = morgan(isProduction() ? prodFormat : devFormat, { stream });

module.exports = {
  logger,
};
