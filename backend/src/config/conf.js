const express = require("express");
const router = express.Router();

const config = {
  defaultRole: "guest",
  roles: ["guest", "user", "admin"],
  // who can read from who
  readAccess: {
    guest: ["user"], // ie guest can read what user posts.
    user: ["user", "guest"], // user can read posts meant for guests
    admin: ["guest", "user", "admin"],
  },
  // who can write to who
  writeAccess: {
    user: ["guest", "user", "admin"],
    admin: ["guest", "user", "admin"],
    guest: [],
  },
};

router.get("/config/roles", (req, res) => {
  res.send({ config: config });
});
router.get("/config/writeAccess", (req, res) => {
  res.send({ config: config.writeAccess });
});

module.exports = { router, config };
