const express = require("express");
const { healthCheck } = require("./controllers/api.controllers");
const { getTopics } = require("./controllers/topics.controllers");

const app = express();

app.get("/api", healthCheck);

app.get("/api/topics", getTopics);

module.exports = app;