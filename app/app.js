const express = require("express");
const { healthCheck } = require("./controllers/api.controllers");
const { getArticleById } = require("./controllers/articles.controllers");
const { getTopics, postTopics } = require("./controllers/topics.controllers");

const app = express();

app.get("/api", healthCheck);

app.get("/api/topics", getTopics);
app.post("/api/topics", postTopics);
app.get("/api/articles/:article_id", getArticleById);

app.use((error, request, response, next) => {
	if (error.status === 501) {
		response.status(501).send({ error: { message: "501 Not Implemented" } });
	} else {
		next(error);
	}
});

app.use((error, request, response, next) => {
	console.log(error);
	response.status(500).send({ error });
});

module.exports = app;