const express = require("express");
const { healthCheck } = require("./controllers/api.controllers");
const { getTopics } = require("./controllers/topics.controllers");

const app = express();

app.get("/api", healthCheck);

app.get("/api/topics", getTopics);

app.use((error, request, response, next) => {
	console.log(error);
	response.status(500).send({ error });
});

module.exports = app;