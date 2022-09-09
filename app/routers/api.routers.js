const express = require("express");
const { healthCheck } = require("../controllers/api.controllers");
const apiRouter = express.Router();
const articlesRouter = require("./articles.router");
const topicsRouter = require("./topics.router");
const usersRouter = require("./users.routers");

apiRouter.get("/", healthCheck);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;