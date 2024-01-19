const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");

const randomBytes = promisify(crypto.randomBytes);

const s3 = new aws.S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.ACS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

const bucket = process.env.S3_BUCKET;

async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucket,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return { url: uploadURL, key: imageName };
}

async function generateDownloadURL(imageName) {
  const params = {
    Bucket: bucket,
    Key: imageName,
    Expires: 60,
  };
  const downloadURL = await s3.getSignedUrlPromise("getObject", params);
  return downloadURL;
}

module.exports = { generateUploadURL, generateDownloadURL };
