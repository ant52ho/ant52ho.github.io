const { jwtDecode } = require("jwt-decode");
const { config } = require("./config/conf");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
  console.log(err);
}

function addJWTtoCookie(req, res, next) {
  try {
    if (req?.cookies === undefined) {
      next();
    }
    console.log(req?.cookies || false);
    console.log(req.cookies);
    const decoded = jwtDecode(req.cookies["_auth"]);
    req.cookies = {
      ...req.cookies,
      ...decoded,
    };
  } catch (err) {
    // no cookie found, so we assign guest cookie
    req.cookies = {
      userRole: config.defaultRole,
      username: "guest",
      email: "",
      id: null,
    };
    // console.log(err);
    console.log("No cookie available to parse, adding guest cookie");
  }
  next();
}

module.exports = {
  notFound,
  errorHandler,
  addJWTtoCookie,
};
