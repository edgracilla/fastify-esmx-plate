// configuratoin will be initiated here

require('dotenv').config();

const app = require('./src/app');

const port = +(process.env.PORT || 8080);
const env = process.env.NODE_ENV || 'development';

const logger = env === 'development'
  ? { transport: { target: 'pino-pretty', options: { translateTime: true } } }
  : env !== 'test';

const ajv = {
  customOptions: {
    allErrors: true,
    keywords: ['prereq'],
  },
};

const appConfig = {
  fastify: { logger, ajv },
  port,
};

const server = app(appConfig);

// -- app exit handler

['SIGHUP', 'SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    server.log.info(`[${signal}] Terminating process..`);

    server.close().then(() => {
      server.log.info('Server successfully closed!');
      process.exit(1);
    }, (err) => {
      server.log.error(err);
    });
  });
});

module.exports = server;
