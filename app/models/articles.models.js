const db = require("../../db/connection.js");

exports.selectArticleById = (article_id) => {
	return db.query(`
		SELECT * FROM articles
		WHERE article_id = $1
	`, [article_id])
		.then((dbResult) => {
			if (dbResult.rowCount === 0) {
				return Promise.reject({ code: 404, message: "No article found" });
			} else {
				return dbResult.rows[0];
			}
		});
};

exports.updateArticleById = (article_id, numberOfVotes) => {
	return db.query(`
		UPDATE articles
		SET votes = votes + $1
		WHERE article_id = $2
		RETURNING *;
	`, [numberOfVotes, article_id])
		.then((dbResult) => {
			return dbResult.rows[0];
		});
};