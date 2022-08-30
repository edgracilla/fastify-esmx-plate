import fastify from 'fastify';

import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import formbody from '@fastify/formbody';

import sysUtils from './core/system/utils.mjs';
import errHandler from './core/system/err-handler.mjs';

function app(config) {
  const server = fastify(config.fastify);

  server.register(helmet);
  server.register(formbody);
  server.register(cors, { origin: '*' }); // !

  // server.register(dbService, config.mongodb);

  server.setErrorHandler(errHandler);

  // -- app loader

  server.after(async () => {
    const versions = sysUtils.getDirs(`${config.root}/src/modules/*`);

    versions.forEach((version) => {
      const routes = sysUtils.getFiles(`${config.root}/src/modules/${version}/*/routes.mjs`);
      routes.map(async (routePath) => {
        const route = import(routePath);
        server.register(route, { prefix: `/${version}` });
      });
    });
  });

  // -- app init

  if (config.env !== 'test') {
    server.ready((err) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      } else {
        server.listen({ port: config.port });
      }
    });
  }

  return server;
}

export default app;
