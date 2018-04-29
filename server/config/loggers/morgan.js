const morgan = require('morgan');
const { infoStream, warningStream, errorStream } = require('./winston');
const isProduction = require('../../helpers/isProduction');

const prodFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"';
const devFormat = 'dev';

const format = isProduction() ? prodFormat : devFormat;

const skipErrors = (req, res) => res.statusCode >= 400;
const normalResponseLogger = morgan(format, {
  stream: infoStream,
  skip: skipErrors,
});

const skipAllExceptClientErrors = (req, res) => res.statusCode < 400 || res.statusCode >= 500;
const clientErrorsLogger = morgan(format, {
  stream: warningStream,
  skip: skipAllExceptClientErrors,
});

const skipAllExceptServerErrors = (req, res) => res.statusCode < 500;
const serverErrorsLogger = morgan(format, {
  stream: errorStream,
  skip: skipAllExceptServerErrors,
});

module.exports = {
  normalResponseLogger,
  clientErrorsLogger,
  serverErrorsLogger,
};
