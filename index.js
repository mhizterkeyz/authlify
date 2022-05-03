const config = require("./config");
const app = require("./src/app");
const logger = require("./src/shared/logger");

require("dotenv").config();

const { port } = config();

app.listen(port, () => {
  logger.info(`app started on port ${port}`);
});
