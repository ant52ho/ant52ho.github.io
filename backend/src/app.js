const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./auth/passport");

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors(corsConfig));
// app.use(cookieParser());
// app.use(middlewares.addJWTtoCookie);
// app.use(middlewares.logCookies);
app.use(middlewares.parseJWT);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
