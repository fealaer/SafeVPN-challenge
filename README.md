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
* App Server Port - PORT
* MongoDB connection - MONGODB_URL
* Redis connection - REDIS_URL
#### by JSON files
* development - <rootDir>/server/config/env/development.json
* production - <rootDir>/server/config/env/production.json

## Scripts

### Production
* Start - ```npm run start```

### Development
* Start dev server - ```npm run start:dev``` -- concurrently runs test:watch, lint:watch and nodemon
* ES lint single run - ```npm run lint```
* ES lint watch - ```npm run lint:watch```
* Check circular dependencies - ```npm run check-circular-dependencies```
* Unit tests single run - ```npm run test``` -- during pretest phase runs ES lint and check-circular-dependencies
* Unit tests watch - ```npm run test:watch```
