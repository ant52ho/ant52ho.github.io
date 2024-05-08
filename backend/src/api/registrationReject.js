// handles api request to reject user from registering

const express = require("express");
const Registration = require("../models/registration");
const router = express.Router();
const transporter = require("../email");

async function sendRejectEmail(email, reason) {
  // send email with password
  const info = await transporter.sendMail({
    from: `Anthony Ho ${process.env.EMAIL}`,
    to: email,
    subject: "Thank you for your application",
    html: `
      <h1>Hello</h1>
      <p>Thanks for applying.</p>
      <p>There were many talented applicants and it was a very tough decision</p>
      <p>but we have decided not to go forwards with your application.</p>
      <p>Keep posted for more news.</p>
      <span />
      <p>Your submitted response: ${reason}</p>
      `,
  });
  console.log("Sending email");
  return true;
}

router.post("/register/reject", async (req, res) => {
  const { email, reason } = req.body;

  // delete from db
  const deleteFromDB = await Registration.destroy({
    where: { email: email },
  }).catch((err) => {
    res.json({
      error: `Failed to delete registration from registrations table. ${err}`,
    });
  });

  // send email
  const send = await sendRejectEmail(email, reason).catch((err) => {
    res.json({ error: `User rejected but failed to send email. ${err}` });
  });

  if (send) {
    res.json({ message: "User rejected and email sent successfully!" });
  }

  // res.json({ message: "Successfully rejected" });
});

module.exports = router;
