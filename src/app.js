const express = require("express");
const helmet = require("helmet");
const { HTTP_STATUS } = require("./shared/constants");
const HttpException = require("./shared/exceptions/http-exception");
const NotFoundException = require("./shared/exceptions/not-found-exception");
const logger = require("./shared/logger");
const Response = require("./shared/response");
const routes = require("./routes");

const app = express();

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(routes);
app.use((req) => {
  throw new NotFoundException(`Cannot ${req.method} ${req.path}`);
});
app.use((error, req, res, _next) => {
  let response = {
    message: "An unexpected error occurred",
    code: "ServerError",
  };
  let status = HTTP_STATUS.SERVER_ERROR;
  if (error instanceof HttpException) {
    [status, response] = error.getHttpResponse();
  } else {
    logger.error(`unexpected error - ${error.message}`, {
      stack: error.stack,
      body: req.body,
      params: req.params,
      query: req.query,
      user: req.user,
      headers: req.headers,
    });
  }

  Response.json(res, status, response);
});

module.exports = app;
