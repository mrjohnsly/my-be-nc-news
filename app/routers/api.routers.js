const express = require("express");
const { healthCheck } = require("../controllers/api.controllers");
const apiRouter = express.Router();

apiRouter.get("/", healthCheck);

module.exports = apiRouter;