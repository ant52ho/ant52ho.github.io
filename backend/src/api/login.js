const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error:", err);
    }
  );

  if (!userWithEmail) {
    console.log("failed to login");

    return res
      .status(400)
      .json({ message: "Email or password does not match" });
  }

  const passwordCompare = await bcrypt.compare(
    password,
    userWithEmail.password
  );

  // security vulnerability. I keep option to use plaintext password in db
  if (!passwordCompare && userWithEmail.password !== password) {
    return res
      .status(400)
      .json({ message: "Email or password does not match" });
  }

  const jwtToken = jwt.sign(
    {
      id: userWithEmail.id,
      username: userWithEmail.fullName,
      email: userWithEmail.email,
      userRole: userWithEmail.userRole,
    },
    process.env.JWT_SECRET
  );

  console.log("Login success");
  res.json({ message: "Welcome back!", token: jwtToken });
});

module.exports = router;
