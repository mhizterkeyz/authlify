const { HTTP_STATUS } = require('../constants');
const HttpException = require('./http-exception');

class BadRequestException extends HttpException {
  constructor(message = 'BadRequest', code = 'BadRequest') {
    super(message, HTTP_STATUS.BAD_REQUEST, code);
  }
}

module.exports = BadRequestException;
