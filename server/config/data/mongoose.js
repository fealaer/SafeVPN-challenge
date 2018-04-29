const mongoose = require('mongoose');
const config = require('config');
const handleError = require('../../helpers/handleError');
const logger = require('../../logger');

mongoose.Promise = Promise;

const options = {
  autoIndex: false,
  keepAlive: 120,
  useMongoClient: true,
};

// Connection ready states
// const DISCONNECTED = 0;
const CONNECTED = 1;
const CONNECTING = 2;
// const DISCONNECTING = 3;
// const UNINITIALIZED = 99;

const connectToDb = () => {
  let { connection } = mongoose;
  if (!connection
      || !(connection.readyState === CONNECTED || connection.readyState === CONNECTING)) {
    mongoose.connect(config.db.url, options);
    connection = mongoose.connection; // eslint-disable-line prefer-destructuring
    connection.on('error', handleError);
    connection.on('connected', () => logger.info('MongoDB: connected'));
    connection.on('disconnected', () => logger.info('MongoDB: disconnected'));
  }
};

connectToDb();

module.exports = mongoose;
