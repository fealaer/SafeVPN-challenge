const winston = require('winston');
const isProduction = require('../../helpers/isProduction');

winston.emitErrs = true;

const prodTransports = [
  new winston.transports.File({
    filename: './logs/prod-logs.log',
    maxsize: 5242880,
    maxFiles: 5,
    level: 'info',
    handleExceptions: true,
    json: true,
    colorize: false,
  }),
  new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  }),
];

const devTransports = [
  new winston.transports.File({
    filename: './logs/dev-logs.log',
    maxsize: 1048576,
    maxFiles: 2,
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }),
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
const createStreamForLevel = level => ({
  write: message => logger[level](message.trim()),
});

module.exports.infoStream = createStreamForLevel('info');
module.exports.warningStream = createStreamForLevel('warn');
module.exports.errorStream = createStreamForLevel('error');
