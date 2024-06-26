// endpoint for checking if a certain access type is valid

const express = require("express");
const router = express.Router();
const { config } = require("../config/conf");
const BlogPermission = require("../models/blogpermission");
const BlogPost = require("../models/blogpost");
const sequelize = require("../database");
const { QueryTypes, Op } = require("sequelize");

// returns true if user has admin perms
const checkAdmin = async (req) => {
  if (req.jwtPayload.userRole === "admin") {
    return { check: true };
  }
  return { check: false };
};

// check if specific post can be accessed
const checkBlogView = async (req) => {
  const postId = req.query.postId;
  const userRole = req.jwtPayload.userRole;
  const access = config.readAccess[userRole];
  const permission = await BlogPermission.findOne({
    where: {
      userRole: { [Op.in]: access },
      postId: postId,
    },
  });

  if (permission === null) {
    return { message: "Insufficient perms to view post", check: false };
  } else {
    return { check: true };
  }
};

// check if can edit
const checkBlogEdit = async (req) => {
  console.log("blog edit check");
  const postId = req.query.postId;
  const author = await BlogPost.findOne({
    where: {
      postId: postId,
    },
  });

  // returns true if is admin or user is owner
  if (
    req.jwtPayload.userRole === "admin" ||
    author.username === req.jwtPayload.username
  ) {
    return { check: true };
  }
  return { check: false };
};

const checkCreatePost = async (req) => {
  if (config.writeAccess[req.jwtPayload.userRole].length !== 0) {
    return { check: true };
  }
  return { check: false };
};

const checkClare = async (req) => {
  if (
    req.jwtPayload.userRole === "clare" ||
    req.jwtPayload.userRole === "admin"
  ) {
    return { check: true };
  }
  return { check: false };
};

router.get("/blog/access", async (req, res) => {
  let response;
  if (req.query.accessType === "admin") {
    response = await checkAdmin(req);
  } else if (req.query.accessType === "viewPost") {
    response = await checkBlogView(req);
  } else if (req.query.accessType === "editPost") {
    response = await checkBlogEdit(req);
  } else if (req.query.accessType === "createPost") {
    response = await checkCreatePost(req);
  } else if (req.query.accessType === "clare") {
    response = await checkClare(req);
  }
  return res.json(response);
});

module.exports = router;
