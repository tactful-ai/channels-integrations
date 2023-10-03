const dotenv = require("dotenv").config();
const op = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  dialect: "postgres",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};
module.exports = {
  development: op,
  test: op,
  production: op,
};
