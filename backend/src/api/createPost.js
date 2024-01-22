const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogpost");
const BlogPermission = require("../models/blogpermission");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const zlib = require("zlib");
const { promisify } = require("util");
const deflate = promisify(zlib.deflate);

router.post(
  "/create-post",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { title, previewSummary, body, role } = req.body;
    const { id, email, userRole, username } = req.cookies;
    console.log(req.cookies);
    console.log(req.body);

    // strategy:
    // we store in 2db:
    // one db stores unique post id
    const postId = uuidv4();

    // compressing the post body
    const deflatedBody = await deflate(body)
      .then((buf) => {
        return buf.toString("base64");
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(deflatedBody);

    // inserting into db
    const newPost = new BlogPost({
      postId: postId,
      username: username,
      userId: id,
      title: title,
      summary: previewSummary,
      content: deflatedBody,
    });
    const savedPost = await newPost.save().catch((err) => {
      console.log("Error:", err);
      return res.json({ error: "Cannot create post at the moment!" });
    });

    // insert tags into second db
    console.log(role);
    for (let i = 0; i < role.length; i++) {
      const newPostPermissions = new BlogPermission({
        postId: postId,
        userRole: role[i],
      });

      const savedPermission = await newPostPermissions.save().catch((err) => {
        console.log("Error:", err);
        return res.json({ error: "Cannot create post perm at the moment!" });
      });
    }

    if (savedPost) {
      res.send({ message: "success!" });
    }
  }
);

module.exports = router;
