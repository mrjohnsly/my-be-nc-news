const express = require("express");
const { getTopics, postTopics } = require("../controllers/topics.controllers");
const topicsRouter = express.Router();

topicsRouter.get("/", getTopics);
topicsRouter.post("/", postTopics);

module.exports = topicsRouter;