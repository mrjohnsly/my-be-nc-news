const express = require("express");
const { statusCodeError, psqlError, unhandledError } = require("./middleware/error.middleware");
const apiRouter = require("./routers/api.routers");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(statusCodeError);
app.use(psqlError);
app.use(unhandledError);

module.exports = app;