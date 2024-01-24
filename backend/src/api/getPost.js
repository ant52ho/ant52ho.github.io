const express = require("express");
const router = express.Router();
const { config } = require("../config/conf");
const BlogPermission = require("../models/blogpermission");
const BlogPost = require("../models/blogpost");
const sequelize = require("../database");
const { QueryTypes, Op } = require("sequelize");
const { promisify } = require("util");
const zlib = require("zlib");
const unzip = promisify(zlib.unzip);

// code for unzipping after storage
async function decompress(deflatedBody) {
  const buffer = Buffer.from(deflatedBody, "base64");
  const unzippedBody = await unzip(buffer)
    .then((buf) => {
      return buf.toString();
    })
    .catch((err) => {
      console.log(err);
    });
  return unzippedBody;
}

router.get("/blog/previews", async (req, res) => {
  console.log(req.cookies);
  const role = req.cookies.userRole;

  const access = config.readAccess[role];
  console.log(access);

  const formattedAccess = "('" + access.join("', '") + "')";

  // here we need to do role based getting
  const posts = await sequelize
    .query(
      `
      SELECT blogposts.postId, blogposts.username, blogposts.title, blogposts.createdAt, blogposts.summary,
       GROUP_CONCAT(blogpermissions.userRole) AS permissions
      FROM blogposts
      LEFT JOIN blogpermissions ON blogposts.postId = blogpermissions.postId
      WHERE blogpermissions.userRole IN ${formattedAccess}
      GROUP BY blogposts.postId;
    `,
      { type: QueryTypes.SELECT }
    )
    .catch((err) => {
      console.log("Error:", err);
    });

  console.log("All posts:", JSON.stringify(posts, null, 2));
  return res.json({ posts: posts, access: access });
});

// // decompress all the posts
// for (let i = 0; i < posts.length; i++) {
//   posts[i].content = await decompress(posts[i].content);
// }

router.get("/blog/post", async (req, res) => {
  const userRole = req.cookies.userRole;
  const postId = req.query.postId;

  // // role based accesses
  const access = config.readAccess[userRole];

  // check if userRole and postId are in database
  const permission = await BlogPermission.findOne({
    where: {
      userRole: { [Op.in]: access },
      postId: postId,
    },
  });

  // if no access
  if (permission === null) {
    return res.status(400).json({ message: "Insufficient perms to view post" });
  }

  var post = await BlogPost.findOne({
    where: { postId: postId },
    type: QueryTypes.SELECT,
  });
  post.content = await decompress(post.content);

  return res.json({ post: post });
});

module.exports = router;
