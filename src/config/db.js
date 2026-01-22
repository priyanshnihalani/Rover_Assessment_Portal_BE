const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "rover_assessment",     
  "postgres",        
  "postgres",        
  {
    host: "localhost",
    dialect: "postgres",
    logging: false    
  }
);

module.exports = sequelize;
