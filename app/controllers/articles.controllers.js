const { selectArticleById } = require("../models/articles.models");

exports.getArticleById = (request, response, next) => {
	const article_id = request.params.article_id;
	selectArticleById(article_id)
		.then((article) => {
			response.status(200).send({ article });
		})
		.catch((error) => {
			next(error);
		});
};