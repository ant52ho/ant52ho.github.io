const express = require("express");
const router = express.Router();

const config = {
  defaultRole: "guest",
  // who can read from who
  readAccess: {
    guest: ["guest"], // ie guest can only read posts posted to guest
    user: ["user", "guest"], // user can read posts meant for guests
    admin: ["guest", "user", "admin", "clare", "ehsan"],
    clare: ["guest", "user", "admin", "clare"],
    ehsan: ["ehsan"],
  },
  // who can write to who
  writeAccess: {
    user: ["guest", "user", "admin"],
    admin: ["guest", "user", "admin", "clare", "ehsan"],
    clare: ["guest", "user", "admin", "clare"],
    ehsan: ["ehsan"],
    guest: [],
  },
};

// router.get("/config/roles", (req, res) => {
//   res.send({ config: config });
// });
router.get("/config/writeAccess", (req, res) => {
  res.send({ config: config.writeAccess });
});

module.exports = { router, config };
