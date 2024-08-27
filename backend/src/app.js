const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");

require("dotenv").config();
require("./auth/passport");

const middlewares = require("./middlewares");
const api = require("./api");
const poopapi = require("./api/poop_app_api");
const app = express();
const server = http.createServer(app);

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors(corsConfig));
app.use(middlewares.parseJWT);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);
app.use("/api/v1/poop", poopapi);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = { server, app };
