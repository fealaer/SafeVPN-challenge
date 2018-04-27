const config = require('config');
const express = require('express');
const register = require('./register');

const app = express();

app.use(register.requestLogger);

app.get('/', (req, res) => res.send('Hello World!'));

const { port } = config.server;
app.listen(port, () => console.log(`Sever listening on port ${port}!`));
