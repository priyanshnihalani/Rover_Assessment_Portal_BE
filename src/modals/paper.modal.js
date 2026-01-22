const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Paper = sequelize.define("Paper", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING(12),
        unique: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timeLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("DRAFT", "ACTIVE", "ARCHIVED"),
        defaultValue: "DRAFT",
    },

    questionsToShow: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10, 
    },
});

module.exports = Paper;
