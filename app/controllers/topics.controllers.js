exports.getTopics = (request, response) => {
	response.status(200).send({ topics: [] });
};