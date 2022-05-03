class HttpException extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }

  getHttpResponse() {
    return [this.status, { message: this.message, code: this.code }];
  }
}

module.exports = HttpException;
