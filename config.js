const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_NAME: process.env.SERVER_NAME,
  FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,

  SERVER_LOG_LEVEL: process.env.SERVER_LOG_LEVEL,
  SERVER_LOG_CATEGORY: process.env.SERVER_LOG_CATEGORY,
  SERVER_LOG_FILE: process.env.SERVER_LOG_FILE,

  PRIVATE_KEY: process.env.PRIVATE_KEY,
};