const { HTTP_STATUS } = require('../constants');
const HttpException = require('./http-exception');

class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized', code = 'Unauthorized') {
    super(message, HTTP_STATUS.UNAUTHORIZED, code);
  }
}

module.exports = UnauthorizedException;
