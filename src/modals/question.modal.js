const { DataTypes } = require('sequelize')
const sequelize = require('../config/db');

const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    prompt: DataTypes.TEXT,
    correctOption: DataTypes.STRING(1),
    points: DataTypes.INTEGER,
    softDelete: {type: DataTypes.BOOLEAN, defaultValue: false}
});

module.exports = Question