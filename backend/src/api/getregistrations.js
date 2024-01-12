const express = require("express");
const passport = require("passport");
const commons = require("../commons");
const Registration = require("../models/registration");
const router = express.Router();

router.get(
  "/admin/registrations",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // console.log(commons.decodeCookieJWT(req.cookies));
    // const userJWT = commons.decodeCookieJWT(req.cookies);
    // const userInfo = await User.findOne({
    //   where: { id: userJWT.id },
    // }).catch((err) => {
    //   console.log("Error:", err);
    // });
    // if (userInfo.permission == 0) {
    //   res.status(400).json({ error: "Insufficient permissions" });
    // }

    const registrations = await Registration.findAll({
      attributes: ["username", "email", "reason"],
    }).catch((err) => {
      console.log("Error:", err);
    });
    console.log(
      registrations.every(
        (registrations) => registrations instanceof Registration
      )
    );
    console.log("All registrations:", JSON.stringify(registrations, null, 2));
    res.json(registrations);
  }
);

module.exports = router;
