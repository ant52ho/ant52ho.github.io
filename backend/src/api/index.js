const express = require("express");

const emojis = require("./emojis");
const registerApi = require("./register");
const loginApi = require("./login");
const paymentApi = require("./payment");
const adminApi = require("./admin");
const adminRegistrationsApi = require("./getregistrations");
const registerAcceptApi = require("./registrationAccept");
const registerRejectApi = require("./registrationReject");
const s3UrlApi = require("./s3Url");
const createPostApi = require("./createPost");
const configApi = require("../config/conf").router;
const getPostApi = require("./getPost");

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
router.use(s3UrlApi);
router.use(createPostApi);
router.use(configApi);
router.use(getPostApi);

module.exports = router;
