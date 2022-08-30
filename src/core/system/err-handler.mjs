import ApiError from './api-error.mjs';

export default function errHandler(error, request, reply) {
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
