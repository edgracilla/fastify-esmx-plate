const fastify = require('fastify');

const cors = require('@fastify/cors');
const helmet = require('@fastify/helmet');
const formbody = require('@fastify/formbody');

function app(config) {
  const server = fastify(config.fastify);

  server.register(helmet);
  server.register(formbody);
  server.register(cors, { origin: '*' }); // !!

  // server.register(apiReactor);
  // server.register(dbService, config.mongodb);

  // -- app loader

  server.after(async () => {
    //
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
}

module.exports = app;
