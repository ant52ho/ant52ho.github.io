const express = require("express");
const Upload = require("../models/upload");
const router = express.router;

const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Load the SDK for JavaScript
const AWS = require("aws-sdk");
const S3 = new AWS.S3({
  signatureVersion: "v4",
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});
