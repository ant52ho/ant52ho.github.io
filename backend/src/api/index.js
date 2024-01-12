const express = require("express");

const emojis = require("./emojis");
const registerApi = require("./register");
const loginApi = require("./login");
const paymentApi = require("./payment");
const adminApi = require("./admin");
const adminRegistrationsApi = require("./getregistrations");
const registerAcceptApi = require("./registrationAccept");
const registerRejectApi = require("./registrationReject");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use(registerApi);
router.use(loginApi);
router.use(paymentApi);
router.use(adminApi);
router.use(adminRegistrationsApi);
router.use(registerAcceptApi);
router.use(registerRejectApi);

module.exports = router;
