// determines who can see a blog post
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const BlogPermission = sequelize.define("BlogPermission", {
  postId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: "blogposts",
      key: "postId",
    },
  },
  userRole: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
});

module.exports = BlogPermission;
