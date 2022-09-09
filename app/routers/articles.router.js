const express = require("express");
const { getArticles, getArticleById, patchArticleById, getArticleComments } = require("../controllers/articles.controllers");
const articlesRouter = express.Router();

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.post("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.delete("/:article_id", getArticleById);
articlesRouter.get("/:article_id/comments", getArticleComments);

module.exports = articlesRouter;