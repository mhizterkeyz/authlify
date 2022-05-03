const { HTTP_STATUS } = require('../constants');
const HttpException = require('./http-exception');

class ValidationException extends HttpException {
  constructor(
    errors = {},
    message = 'ValidationError',
    code = 'ValidationError',
  ) {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, code);
    this.errors = errors;
  }

  getHttpResponse() {
    return [
      this.status,
      { message: this.message, code: this.code, errors: this.errors },
    ];
  }
}

module.exports = ValidationException;
