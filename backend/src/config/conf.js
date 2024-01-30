const express = require("express");
const router = express.Router();

const config = {
  defaultRole: "guest",
  roles: ["guest", "user", "admin"],
  readAccess: {
    guest: ["user"], // ie guest can read what user posts.
    user: ["user"],
    admin: ["guest", "user", "admin"],
  },
};

router.get("/config/roles", (req, res) => {
  res.send({ roles: config.roles });
});

module.exports = { router, config };
