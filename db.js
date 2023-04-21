// @ts-nocheck
const { Sequelize } = require("sequelize");

if (process.env.NODE_ENV === "development") {
  module.exports = new Sequelize(
    process.env.DB_NAME || "education",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "1976",
    {
      host: process.env.DB_HOST || "localhost",
      dialect: process.env.DB_DIALECT || "postgres",
      port: process.env.DB_PORT || "5433",
    }
  );
} else {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}
