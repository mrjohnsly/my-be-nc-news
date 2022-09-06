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