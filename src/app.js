const express = require("express");
const guestRouter = require("./routes/guest.route.js");
const weddingRouter = require("./routes/wedding.route.js");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["POST", "PATCH", "PUT", "DELETE", "GET"],
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize({ allowDots: true }));
app.use(xss());

app.use("/api/v1/guests", guestRouter);
app.use("/api/v1/wedding", weddingRouter);

app.get("/api/v1/health", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Up and Running!",
  });
});

module.exports = app;
