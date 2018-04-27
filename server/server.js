const config = require('config');
const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

const { port } = config.server;
app.listen(port, () => console.log(`Sever listening on port ${port}!`));
