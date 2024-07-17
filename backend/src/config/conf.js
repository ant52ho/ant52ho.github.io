const express = require("express");
const router = express.Router();

const config = {
  defaultRole: "guest",
  // who can read from who
  readAccess: {
    guest: ["guest"], // ie guest can only read posts posted to guest
    user: ["user", "guest"], // user can read posts meant for guests
    friend: ["guest", "user", "friend"],
    admin: ["guest", "user", "admin", "clare", "ehsan", "friend"],
    clare: ["guest", "user", "admin", "clare", "friend"],
    ehsan: ["ehsan"],
  },
  // who can write to who
  writeAccess: {
    guest: [],
    user: ["guest", "user", "admin"],
    friend: ["guest", "user", "admin", "friend"],
    admin: ["guest", "user", "admin", "clare", "ehsan", "friend"],
    clare: ["guest", "user", "admin", "clare", "friend"],
    ehsan: ["ehsan"],
  },
};

// router.get("/config/roles", (req, res) => {
//   res.send({ config: config });
// });
router.get("/config/writeAccess", (req, res) => {
  res.send({ config: config.writeAccess });
});

module.exports = { router, config };
