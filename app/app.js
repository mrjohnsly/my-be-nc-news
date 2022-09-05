const express = require("express");

const app = express();

app.get("/api", (request, response) => {
	response.status(200).send({ message: "Server is up" });
});

app.get("/api/topics", (request, response) => {
	response.status(200).send({ topics: [] });
});

module.exports = app;