const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.simple()),
});

logger.add(new transports.Console({ format: format.simple() }));

module.exports = logger;
