const { DataTypes } = require('sequelize')
const sequelize = require('../config/db');

const Option = sequelize.define("Option", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    label: DataTypes.STRING(1),
    text: DataTypes.TEXT,
});

module.exports = Option
