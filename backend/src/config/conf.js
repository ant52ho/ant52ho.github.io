const express = require("express");
const router = express.Router();

const config = {
  defaultRole: "guest",
  roles: ["guest", "user", "admin"],
  roleAccess: {
    guest: ["user"],
    user: ["guest", "user"],
    admin: ["guest", "user", "admin"],
  },
};

router.get("/config/roles", (req, res) => {
  res.send({ roles: config.roles });
});

module.exports = { router, config };
