const config = require('config');
const express = require('express');
const { requestLogger, logger } = require('./register');

const app = express();

app.use(requestLogger);

app.get('/', (req, res) => res.send('Hello World!'));

const { port } = config.server;
app.listen(port, () => logger.info(`Sever listening on port ${port}!`));
