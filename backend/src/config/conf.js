const express = require("express");
const router = express.Router();

const config = {
  defaultRole: "user",
  roles: ["user", "admin"],
  roleAccess: {
    user: ["user"],
    admin: ["user", "admin"],
  },
};

router.get("/config/roles", (req, res) => {
  res.send({ roles: config.roles });
});

module.exports = { router, config };
