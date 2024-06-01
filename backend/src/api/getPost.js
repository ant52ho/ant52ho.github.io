const express = require("express");
const router = express.Router();
const { config } = require("../config/conf");
const BlogPermission = require("../models/blogpermission");
const BlogPost = require("../models/blogpost");
const sequelize = require("../database");
const { QueryTypes, Op } = require("sequelize");
const { promisify } = require("util");
const zlib = require("zlib");
const { format } = require("path");
const unzip = promisify(zlib.unzip);
const deflate = promisify(zlib.deflate);
const { sql } = require("@sequelize/core");

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
  const role = req.jwtPayload.userRole;

  const access = config.readAccess[role];
  console.log(access);

  // here we need to do role based getting
  const posts = await sequelize
    .query(
      `
      SELECT blogposts.postId, blogposts.username, blogposts.title, blogposts.createdAt, blogposts.updatedAt, blogposts.summary,
       GROUP_CONCAT(blogpermissions.userRole) AS permissions
      FROM blogposts
      LEFT JOIN blogpermissions ON blogposts.postId = blogpermissions.postId
      WHERE blogpermissions.userRole IN (:access)
      GROUP BY blogposts.postId;
    `,
      {
        type: QueryTypes.SELECT,
        replacements: {
          access: access,
        },
      }
    )
    .catch((err) => {
      console.log("Error:", err);
    });

  // console.log("All posts:", JSON.stringify(posts, null, 2));
  return res.json({ posts: posts, access: access });
});

router.get("/blog/post", async (req, res) => {
  const userRole = req.jwtPayload.userRole;
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
    return res.status(401).json({ message: "Insufficient perms to view post" });
  }

  var post = await sequelize.query(
    `
    SELECT blogposts.*, GROUP_CONCAT(blogpermissions.userRole) AS userRoles
    FROM blogposts
    LEFT JOIN blogpermissions ON blogposts.postId = blogpermissions.postId
    WHERE blogposts.postId = :postId
    AND blogpermissions.userRole IN (:access)
    GROUP BY blogposts.postId
    LIMIT 1
    `,
    {
      type: QueryTypes.SELECT,
      replacements: {
        postId: postId,
        access: access,
      },
    }
  );

  post = post[0];

  post.content = await decompress(post.content);
  post.userRoles = post.userRoles.split(",");

  return res.json({ post: post });
});

// route to update posts
router.put("/blog/post", async (req, res) => {
  const params = req.body;
  const userRole = req.jwtPayload.userRole;

  console.log(params);

  // check if user has perms to update
  const author = await BlogPost.findOne({
    where: {
      postId: params.postId,
    },
  });

  if (userRole !== "admin" && author.username !== req.jwtPayload.username) {
    return res.status(401).json({ message: "Not authorized to edit post" });
  }

  // update main table
  const deflatedBody = await deflate(params.body)
    .then((buf) => {
      return buf.toString("base64");
    })
    .catch((err) => {
      console.log(err);
    });

  const updateMain = await BlogPost.update(
    {
      title: params.title,
      content: deflatedBody,
      summary: params.previewSummary,
    },
    {
      where: {
        postId: params.postId,
      },
    }
  );

  // delete alt table
  const deleteAlt = await BlogPermission.destroy({
    where: {
      postId: params.postId,
    },
  });
  // insert into alt table
  const role = params.role;
  console.log(role);
  for (let i = 0; i < role.length; i++) {
    const newPostPermissions = new BlogPermission({
      postId: params.postId,
      userRole: role[i],
    });

    const savedPermission = await newPostPermissions.save().catch((err) => {
      console.log("Error:", err);
      return res.json({ error: "Cannot create post perm at the moment!" });
    });
  }

  return res.json({ message: "Changes saved!", postId: params.postId });
});

// route to delete posts
router.delete("/blog/post", async (req, res) => {
  console.log(req.params);
  console.log(req.query);
  if (!req.query) {
    return res.json({ message: "Failed to delete" });
  }
  const postId = req.query.postId;

  const deleteAssociated = await BlogPermission.destroy({
    where: {
      postId: postId,
    },
  });

  const deletePost = await BlogPost.destroy({
    where: {
      postId: postId,
    },
  });

  return res.json({ message: "Post deleted successfully" });
});

module.exports = router;
