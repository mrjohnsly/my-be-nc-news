exports.healthCheck = (request, response) => {
	response.status(200).send({ message: "Server is up" });
};