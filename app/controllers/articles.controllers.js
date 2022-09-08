const { selectArticleById, updateArticleById, selectArticles } = require("../models/articles.models");

exports.getArticles = (request, response, next) => {
	const topic = request.query.topic;

	selectArticles(topic)
		.then((articles) => {
			response.status(200).send({ articles });
		})
		.catch((error) => {
			next(error);
		});
};

exports.getArticleById = (request, response, next) => {
	if (request.method === "GET") {
		const article_id = request.params.article_id;
		selectArticleById(article_id)
			.then((article) => {
				response.status(200).send({ article });
			})
			.catch((error) => {
				next(error);
			});
	} else {
		response.status(405).send({ error: { code: 405, message: "Method not allowed" } });
	}
};

exports.patchArticleById = (request, response, next) => {
	const article_id = request.params.article_id;
	const request_body = request.body;

	updateArticleById(article_id, request_body)
		.then((article) => {
			response.status(201).send({ article });
		})
		.catch((error) => {
			next(error);
		});
};