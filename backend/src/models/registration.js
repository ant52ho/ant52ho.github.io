// database to store applications

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Registration = sequelize.define("Registration", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Registration;
