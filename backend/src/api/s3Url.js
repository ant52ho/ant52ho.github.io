const express = require("express");
const router = express.Router();

const s3 = require("../s3/s3");

router.get("/s3-upload-url", async (req, res) => {
  const { url, key } = await s3.generateUploadURL();
  res.send({ url, key });
});

router.get("/s3-download-url", async (req, res) => {
  const key = req.query.key;
  const url = await s3.generateDownloadURL(key);
  res.send({ url });
});

module.exports = router;
