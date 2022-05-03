const { HTTP_STATUS } = require('../constants');
const HttpException = require('./http-exception');

class ConflictException extends HttpException {
  constructor(message = 'Conflict', code = 'Conflict') {
    super(message, HTTP_STATUS.CONFLICT, code);
  }
}

module.exports = ConflictException;
