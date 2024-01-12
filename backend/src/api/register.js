// handles api request to register user
const express = require("express");
const User = require("../models/user");
const Registration = require("../models/registration");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, reason } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error:", err);
    }
  );

  const alreadyExistsRegistration = await Registration.findOne({
    where: { email },
  }).catch((err) => {
    console.log("Error:", err);
  });

  if (alreadyExistsUser) {
    return res.json({ message: "Registered user with email already exists" });
  }

  if (alreadyExistsRegistration) {
    return res.json({
      message: "User with pending registration already exists",
    });
  }

  const newRegistration = new Registration({ username, email, reason });
  const savedRegistration = await newRegistration.save().catch((err) => {
    console.log("Error:", err);
    res.json({ error: "Cannot register user at the moment!" });
  });

  if (savedRegistration) {
    res.json({
      message: "Thanks for registering",
    });
  }
});

module.exports = router;
