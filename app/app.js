const express = require("express");
const apiRouter = require("./routers/api.routers");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use((error, request, response, next) => {
	if (error.code === 400) {
		response.status(400).send({ error: error });
	} else if (error.code === 404) {
		response.status(404).send({ error: error });
	} else if (error.code === 501) {
		response.status(501).send({ error: { message: "501 Not Implemented" } });
	} else {
		next(error);
	}
});

app.use((error, request, response, next) => {
	if (error.code === "22P02") {
		response.status(400).send({ error: { code: 400, message: "Bad Request" } });
	}
});

app.use((error, request, response, next) => {
	console.log(error);
	response.status(500).send({ error });
});

module.exports = app;