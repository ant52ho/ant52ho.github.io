// handles api request to register user
const express = require("express");
const User = require("../models/user");
const Registration = require("../models/registration");
const router = express.Router();
const generatePassword = require("generate-password");
const transporter = require("../email/index");
const bcrypt = require("bcrypt");

async function sendEmail(email, password, reason) {
  // send email with password
  const info = await transporter.sendMail({
    from: `Anthony Ho ${process.env.EMAIL}`,
    to: email,
    subject: "Account info",
    html: `
    <h1>Hello</h1>
    <p>Here's your login info for my personal site:</p>
    <p>Email: ${email}</p>
    <p>Password: ${password}</p>
    <p>Your reason (that I liked): ${reason}</p>
    `,
  });
  console.log("Sending email");
  return true;
}

router.post("/register/accept", async (req, res) => {
  const { username, email, reason } = req.body;

  // generate password
  const password = generatePassword.generate({
    length: 6,
    numbers: true,
  });
  console.log("Generated password:", password);

  // hash password
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);

  // define permission
  const userRole = "user";

  // insert new user into db
  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error:", err);
    }
  );
  if (alreadyExistsUser) {
    return res.json({ message: "User with email already exists" });
  }
  const newUser = new User({
    fullName: username,
    email,
    password: secPass,
    userRole,
  });

  const savedUser = await newUser.save().catch((err) => {
    console.log("Error:", err);
    res.json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) {
    // delete from db
    const deleteFromDB = await Registration.destroy({
      where: { email: email },
    }).catch((err) => {
      res.json({
        error: `Failed to delete registration from registrations table. ${err}`,
      });
    });

    // send email
    const send = await sendEmail(email, password, reason).catch((err) => {
      res.json({ error: `User registered but failed to send email. ${err}` });
    });

    if (send) {
      res.json({ message: "User registered and email sent successfully!" });
    }

    // res.json({ message: "Success" });
  }
});

module.exports = router;
