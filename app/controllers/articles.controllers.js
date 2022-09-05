exports.getArticleById = (request, response, next) => {
	response.status(200).send({ article: {} });
};