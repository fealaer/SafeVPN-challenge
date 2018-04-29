const config = require('config');
const express = require('express');
const helmet = require('helmet');

const {
  normalResponseLogger,
  clientErrorsLogger,
  serverErrorsLogger,
} = require('./config/loggers/morgan');
const { logger } = require('./config/loggers/winston');
const setUpRouteHandlers = require('./routeHandlers');

const app = express();

app.use(helmet());

app.use(normalResponseLogger);
app.use(clientErrorsLogger);
app.use(serverErrorsLogger);

setUpRouteHandlers(app);

const { port } = config.server;
app.listen(port, () => logger.info(`Sever listening on port ${port}!`));
