const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");

const app = express();

app.get("/api", (request, response) => {
	response.status(200).send({ message: "Server is up" });
});

app.get("/api/topics", getTopics);

module.exports = app;