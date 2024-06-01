// database to store applications

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Registration = sequelize.define("registration", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "blank",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Registration;
