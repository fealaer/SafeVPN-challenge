const morgan = require('morgan');

const isProduction = () => process.env.NODE_ENV === 'production';

const morganProductionFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"';
const morganDevelopmentFormat = 'dev';

const requestLogger = morgan(isProduction() ? morganProductionFormat : morganDevelopmentFormat);

module.exports = {
  requestLogger,
};
