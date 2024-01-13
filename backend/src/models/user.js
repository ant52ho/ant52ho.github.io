// A sequelize model - ie a database

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  userRole: {
    type: DataTypes.STRING,
    defaultValue: "user",
    allowNull: false,
  },
});

module.exports = User;
