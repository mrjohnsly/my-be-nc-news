const db = require("../../db/connection.js");

exports.selectUsers = () => {
	return db.query(`
		SELECT * FROM users;
	`)
		.then((dbResult) => {
			return dbResult.rows;
		});
};