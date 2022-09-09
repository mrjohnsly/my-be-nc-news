const express = require("express");
const { healthCheck } = require("../controllers/api.controllers");
const apiRouter = express.Router();
const usersRouter = require("./users.routers");

apiRouter.get("/", healthCheck);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;