const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

module.exports = {
  JWT_KEY: process.env.SALT_SECRET_KEY,
  SALT: bcrypt.genSaltSync(10),
  JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
};
