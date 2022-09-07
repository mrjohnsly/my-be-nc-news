const db = require("../../db/connection.js");

exports.selectArticleById = (article_id) => {
	const getArticle = db.query(`
		SELECT * FROM articles
		WHERE article_id = $1
	`, [article_id]);

	const getComments = db.query(`
		SELECT COUNT(article_id) from comments
		WHERE article_id = $1
	`, [article_id]);

	return Promise.all([getArticle, getComments])
		.then((values) => {
			if (values[0].rowCount === 0) {
				return Promise.reject({ code: 404, message: "No article found" });
			}

			const article = values[0].rows[0];
			article.comment_count = values[1].rows[0].count;
			return article;
		});
};

exports.updateArticleById = (article_id, request_body) => {
	const numberOfVotes = request_body.inc_votes;

	if (Object.keys(request_body).length > 1) {
		return Promise.reject({ code: 400, message: "Bad Request" });
	} else if (!numberOfVotes) {
		return Promise.reject({ code: 400, message: "Bad Request" });
	}

	return db.query(`
		UPDATE articles
		SET votes = votes + $1
		WHERE article_id = $2
		RETURNING *;
	`, [numberOfVotes, article_id])
		.then((dbResult) => {
			if (dbResult.rowCount === 0) {
				return Promise.reject({ code: 404, message: "No article found" });
			}
			return dbResult.rows[0];
		});
};