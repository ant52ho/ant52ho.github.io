const express = require("express");
const router = express.Router();

const config = {
  roles: ["user", "admin"],
};

router.get("/config/roles", (req, res) => {
  res.send({ roles: config.roles });
});

module.exports = { router, config };
