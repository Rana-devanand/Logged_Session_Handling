const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

module.exports = {
  JWT_KEY: process.env.SALT_SECRET_KEY,
  SALT: bcrypt.genSaltSync(10),
};
