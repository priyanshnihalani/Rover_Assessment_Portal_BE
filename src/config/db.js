const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("rth_examdb", "rth", "RTH@2026@Tech", {
  host: "100.21.225.122",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;