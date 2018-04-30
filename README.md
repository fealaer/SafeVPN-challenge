# SafeVPN Challenge

[![Build Status](https://travis-ci.org/fealaer/SafeVPN-challenge.svg?branch=master)](https://travis-ci.org/fealaer/SafeVPN-challenge)

## Required
* node.js >=6
* npm >=3
* MongoDB
* Redis

## Set up

### Install npx globally
```npm install -g npx```

### Install dependencies
* development - ```npm install```
* production - ```npm install --production```

### Configure
#### by ENV variables (*preferable*)
* MongoDB connection - DB_URL
* App Server
  * Host - HOST
  * Port - PORT
* Redis
  * Port - REDIS_PORT
  * Host - REDIS_HOST
#### by JSON files
* development - <rootDir>/server/config/env/development.json
* production - <rootDir>/server/config/env/production.json

## Scripts

### Production
* Start - ```npm run start```
* Stop - ```npm run stop```
* View Logs - ```npm run logs```

### Development
* Start dev server - ```npm run start:dev``` -- concurrently runs test:watch, lint:watch and nodemon
* ES lint single run - ```npm run lint```
* ES lint watch - ```npm run lint:watch```
* Check circular dependencies - ```npm run check-circular-dependencies```
* Unit tests single run - ```npm run test``` -- during pretest phase runs ES lint and check-circular-dependencies
* Unit tests watch - ```npm run test:watch```
