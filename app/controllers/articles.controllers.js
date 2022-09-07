const { selectArticleById, updateArticleById } = require("../models/articles.models");

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
	const numberOfVotes = request.body.inc_votes;

	if (Object.keys(request.body).length > 1) {
		next({ code: 400, message: "Bad Request" });
	} else if (numberOfVotes) {
		updateArticleById(article_id, numberOfVotes)
			.then((article) => {
				response.status(201).send({ article });
			})
			.catch((error) => {
				next(error);
			});
	} else {
		next({ code: 400, message: "Bad Request" });
	}
};