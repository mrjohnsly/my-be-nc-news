const express = require("express");
const { healthCheck } = require("./controllers/api.controllers");
const { getArticles, getArticleById, patchArticleById, getArticleComments } = require("./controllers/articles.controllers");
const { getTopics, postTopics } = require("./controllers/topics.controllers");
const { getUsers } = require("./controllers/users.controllers");

const app = express();

app.use(express.json());
app.get("/api", healthCheck);

app.get("/api/topics", getTopics);
app.post("/api/topics", postTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.post("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.delete("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.get("/api/users", getUsers);

app.use((error, request, response, next) => {
	if (error.code === 400) {
		response.status(400).send({ error: error });
	} else if (error.code === 404) {
		response.status(404).send({ error: error });
	} else if (error.code === 501) {
		response.status(501).send({ error: { message: "501 Not Implemented" } });
	} else {
		next(error);
	}
});

app.use((error, request, response, next) => {
	if (error.code === "22P02") {
		response.status(400).send({ error: { code: 400, message: "Bad Request" } });
	}
});

app.use((error, request, response, next) => {
	console.log(error);
	response.status(500).send({ error });
});

module.exports = app;