// A sequelize model - ie a database

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
