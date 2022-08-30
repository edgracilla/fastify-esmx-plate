class ApiError extends Error {
  constructor(code, message, data) {
    super(message);

    if (code === 400) {
      this.name = 'ValidationError';
    } else if (code === 401) {
      this.name = 'AuthError';
    } else if (code === 403) {
      this.name = 'ForbiddenError';
    } else {
      this.name = 'InternalServerError';
    }

    this.data = data || [];
    this.statusCode = code;
  }
}

module.exports = ApiError;
