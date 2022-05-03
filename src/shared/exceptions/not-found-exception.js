const { HTTP_STATUS } = require('../constants');
const HttpException = require('./http-exception');

class NotFoundException extends HttpException {
  constructor(message = 'NotFound', code = 'NotFound') {
    super(message, HTTP_STATUS.NOT_FOUND, code);
  }
}

module.exports = NotFoundException;
