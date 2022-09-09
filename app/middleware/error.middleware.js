exports.statusCodeError = (error, request, response, next) => {
	if (error.code === 400) {
		response.status(400).send({ error });
	} else if (error.code === 404) {
		response.status(404).send({ error });
	} else if (error.code === 501) {
		response.status(501).send({ error: { message: "501 Not Implemented" } });
	} else {
		next(error);
	}
};

exports.psqlError = (error, request, response, next) => {
	if (error.code === "22P02") {
		response.status(400).send({ error: { code: 400, message: "Bad Request" } });
	} else if (error.code === "23503") {
		response.status(404).send({ error: { code: 404, message: "No article found" } });
	} else {
		next(error);
	}
};

exports.unhandledError = (error, request, response, next) => {
	console.log(error);
	response.status(500).send({ error });
};