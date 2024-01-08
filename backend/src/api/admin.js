const express = require("express");
const passport = require("passport");
const commons = require("../commons");
const User = require("../models/user");

const router = express.Router();

router.get(
    "/admin",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        console.log(commons.decodeCookieJWT(req.cookies));
        const userJWT = commons.decodeCookieJWT(req.cookies);
        const userInfo = await User.findOne({
            where: { id: userJWT.id },
        }).catch((err) => {
            console.log("Error:", err);
        });
        if (userInfo.permission == 0) {
            res.status(400).json({ error: "Insufficient permissions" });
        } else {
            res.send("Admin only message!");
        }
    }
);

module.exports = router;
