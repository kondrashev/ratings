// @ts-nocheck
const { Sequelize } = require("sequelize");
switch (process.env.NODE_ENV) {
  case "production":
    module.exports = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
    break;
  case "development":
    module.exports = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
      }
    );
    break;
}
