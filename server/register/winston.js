const winston = require('winston');
const isProduction = require('../helpers/isProduction');

winston.emitErrs = true;

const prodTransports = [
  new winston.transports.File({
    level: 'warning',
    filename: './logs/all-logs.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  }),
  new winston.transports.Console({
    level: 'warning',
    handleExceptions: true,
    json: false,
    colorize: true,
  }),
];

const devTransports = [
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }),
];
const logger = new winston.Logger({
  transports: isProduction() ? prodTransports : devTransports,
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write: message => logger.info(message.trim()),
};
