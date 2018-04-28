const config = require('config');
const express = require('express');
const {
  normalResponseLogger,
  clientErrorsLogger,
  serverErrorsLogger,
  logger,
} = require('./register');

const app = express();

app.use(normalResponseLogger);
app.use(clientErrorsLogger);
app.use(serverErrorsLogger);

app.get('/', (req, res) => res.send('Hello World!'));

const { port } = config.server;
app.listen(port, () => logger.info(`Sever listening on port ${port}!`));
