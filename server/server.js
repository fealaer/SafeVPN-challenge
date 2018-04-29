const config = require('config');
const express = require('express');
const helmet = require('helmet');
const {
  normalResponseLogger,
  clientErrorsLogger,
  serverErrorsLogger,
} = require('./config/loggers/morgan');
const logger = require('./logger');
const routes = require('./routes');
const notFound = require('./middlewares/notFound');
const returnError = require('./middlewares/returnError');

const app = express();

app.use(helmet());

app.use(normalResponseLogger);
app.use(clientErrorsLogger);
app.use(serverErrorsLogger);

routes(app);

app.use(notFound);
app.use(returnError);

const { port } = config.server;
app.listen(port, () => logger.info(`Sever listening on port ${port}!`));

require('./config/data/mongoose');
