const path = require('path');

process.env.NODE_CONFIG_DIR = path.join(__dirname, './config/env');

global.Promise = require('bluebird');
