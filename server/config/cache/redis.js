const config = require('config');
const redis = require('redis');
const logger = require('../../logger');
const handleError = require('../../helpers/handleError');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client;

const connect = () => {
  client = redis
    .createClient(config.redis.port, config.redis.hostAddress, (err) => {
      if (err) {
        handleError(err);
      }
    });

  client.on('error', handleError);

  client.on('ready', (err) => {
    if (err) {
      handleError(err);
    } else {
      logger.info('REDIS: ', 'ready');
    }
  });
  return client;
};

const getClient = () => (client || connect());

const get = key => getClient().getAsync(key);

const set = (key, val) => getClient().setAsync(key, val);

const setex = (key, seconds, val) => getClient().setexAsync(key, seconds, val);

module.exports = {
  client,
  get,
  set,
  setex,
  connect,
};
