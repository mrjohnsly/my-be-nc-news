const express = require("express");
const { healthCheck } = require("../controllers/api.controllers");
const apiRouter = express.Router();
const topicsRouter = require("./topics.router");
const usersRouter = require("./users.routers");

apiRouter.get("/", healthCheck);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;