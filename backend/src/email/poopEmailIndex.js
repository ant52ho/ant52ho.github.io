const nodemailer = require("nodemailer");

// First, define send settings by creating a new transporter:
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
  port: 465, // Port for SMTP (usually 465)
  secure: true, // Usually true if connecting to port 465
  auth: {
    user: process.env.EMAIL2, // Your email address
    pass: process.env.EMAIL2_PASS, // Password (for gmail, your app password)
    // ⚠️ For better security, use environment variables set on the server for these values when deploying
  },
});

module.exports = transporter;
