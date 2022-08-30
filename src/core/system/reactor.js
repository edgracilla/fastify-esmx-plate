const fastifyPlugin = require('fastify-plugin');
const ApiError = require('./api-error');

function apiResp(reply, payload, code = 200) {
  if (!payload) {
    return reply
      .code(404)
      .send({
        statusCode: 404,
        error: 'Not found',
        message: 'Either resource not found or you are not authorized to perform the operation.',
      });
  }

  if (code === 204) {
    return reply.code(code).send();
  }

  return reply.code(code).send(payload);
}

function apiErr(reply, error) {
  if (error instanceof ApiError) {
    const content = {
      error: error.name,
      message: error.message,
      statusCode: error.statusCode,
    };

    if (error.data.length) {
      content.data = error.data;
    }

    return reply
      .code(error.statusCode)
      .send(content);
  }

  // console.log('---- DEBUG START DEBUG ----');
  // console.log(error); // TODO: to stackdriver, sentry or alike
  // console.log('---- DEBUG END DEBUG ----');

  return reply
    .code(500)
    .send({
      statusCode: 500,
      error: 'Internal server error.',
      message: 'An unexpected error has occurred. Kindly contact support.',
    });
}

const inject = (fastify, options, done) => {
  fastify.decorate('apiResp', apiResp);
  fastify.decorate('apiErr', apiErr);

  done();
};

module.exports = fastifyPlugin(inject);
module.exports.apiErr = apiErr;
