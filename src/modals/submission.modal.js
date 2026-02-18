const { DataTypes } = require('sequelize')
const sequelize = require('../config/db');

const Submission = sequelize.define("Submission", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    studentName: DataTypes.STRING,
    studentEmail: DataTypes.STRING,
    score: DataTypes.INTEGER,
    totalMarks: DataTypes.INTEGER,
});

module.exports = Submission