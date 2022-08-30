import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import app from './src/app.mjs';

dotenv.config();

const port = +(process.env.PORT || 8080);
const env = process.env.NODE_ENV || 'development';
const root = dirname(fileURLToPath(import.meta.url));

const logger = env === 'development'
  ? { transport: { target: 'pino-pretty', options: { translateTime: true } } }
  : env !== 'test';

const ajv = {
  customOptions: {
    allErrors: true,
  },
};

const appConfig = {
  fastify: { logger, ajv },
  port,
  root,
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

export default server;
