const express = require("express");
const passport = require("passport");
const commons = require("../commons");
const Registration = require("../models/registration");
const router = express.Router();

router.get("/admin/registrations", async (req, res) => {
  const registrations = await Registration.findAll({
    attributes: ["username", "email", "reason"],
  }).catch((err) => {
    console.log("Error:", err);
  });
  return res.json(registrations);
});

module.exports = router;
