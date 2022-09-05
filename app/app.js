const express = require("express");

const app = express();

app.get("/api", (request, response) => {
	response.status(200).send({ message: "Server is up" });
});

module.exports = app;