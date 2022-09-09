const express = require("express");
const { getArticles, getArticleById, patchArticleById, getArticleComments, postCommentByArticleId } = require("../controllers/articles.controllers");
const articlesRouter = express.Router();

articlesRouter.route("/")
	.get(getArticles);

articlesRouter.route("/:article_id")
	.get(getArticleById)
	.post(getArticleById)
	.patch(patchArticleById)
	.delete(getArticleById);

articlesRouter.route("/:article_id/comments")
	.get(getArticleComments)
	.post(postCommentByArticleId);

module.exports = articlesRouter;