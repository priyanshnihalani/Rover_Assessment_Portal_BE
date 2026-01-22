const { DataTypes } = require('sequelize')
const sequelize = require('../config/db');

const Answer = sequelize.define("Answer", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    selectedOption: DataTypes.STRING(1),
    isCorrect: DataTypes.BOOLEAN,
    marksAwarded: DataTypes.INTEGER,
  });

module.exports = Answer