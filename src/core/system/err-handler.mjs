import ApiError from './api-error.mjs';

export default function errHandler(err, request, reply) {
  const { statusCode } = err;

  const content = {
    statusCode,
    error: err.name,
    message: err.message,
  };

  if (err instanceof ApiError) {
    if (err.data.length) {
      content.data = err.data;
    }

    return reply
      .code(statusCode)
      .send(content);
  }

  if (statusCode === 400) {
    content.error = 'Bad Request';

    return reply
      .code(statusCode)
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
