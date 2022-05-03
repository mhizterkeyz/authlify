class Response {
  static json(res, status, body) {
    res.status(status).json(body);
  }

  static data(res, status, message, data, meta) {
    const body = { message };
    if (data) {
      body.data = data;
    }
    if (meta) {
      body.meta = meta;
    }

    Response.json(res, status, body);
  }
}

module.exports = Response;
