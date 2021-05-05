require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: process.env.SQL_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST_IP,
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "root",
    password: process.env.SQL_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST_IP,
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.SQL_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql",
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    },
  },
};
