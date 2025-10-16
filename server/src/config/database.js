const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config();

// Detect if running locally or in production
const isProduction = process.env.NODE_ENV === "production";

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      logging: false, // disable SQL logs in production
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: path.join(__dirname, "../../database.sqlite"), // local SQLite
      logging: console.log, // show SQL logs locally
    });

const connect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false }); // do not drop tables
    console.log("Database connected and synced");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connect };
