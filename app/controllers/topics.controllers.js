const { selectTopics } = require("../models/topics.models");

exports.getTopics = (request, response) => {
	selectTopics()
		.then((topics) => {
			response.status(200).send({ topics });
		});
};

exports.postTopics = (request, response, next) => {
	next({ code: 501, message: "Not Implemented" });
};