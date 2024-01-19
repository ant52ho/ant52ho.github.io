// blog post schema

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const BlogPost = sequelize.define("BlogPost", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "blank",
  },

  // title
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // content
  content: {
    type: DataTypes.TEXT,
  },
});

module.exports = BlogPost;
