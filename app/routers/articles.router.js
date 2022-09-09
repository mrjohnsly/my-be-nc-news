const express = require("express");
const { getArticles, getArticleById, patchArticleById, getArticleComments } = require("../controllers/articles.controllers");
const articlesRouter = express.Router();

articlesRouter.route("/")
	.get(getArticles);

articlesRouter.route("/:article_id")
	.get(getArticleById)
	.post(getArticleById)
	.patch(patchArticleById)
	.delete(getArticleById);

articlesRouter.route("/:article_id/comments")
	.get(getArticleComments);

module.exports = articlesRouter;