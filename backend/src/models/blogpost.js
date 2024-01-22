// blog post schema

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const BlogPost = sequelize.define("BlogPost", {
  postId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "blank",
  },

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  summary: {
    type: DataTypes.STRING,
    defaultValue: "",
  },

  content: {
    type: DataTypes.TEXT,
  },
});

module.exports = BlogPost;
