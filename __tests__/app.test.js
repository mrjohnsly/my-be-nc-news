const app = require("../app/app.js");
const supertest = require("supertest");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");

beforeEach(() => {
	return seed(testData);
});

afterAll(() => {
	return db.end();
});

describe("/api", () => {
	describe("GET", () => {
		test("200: Responds with a message 'Server is up'", () => {
			return supertest(app)
				.get("/api")
				.expect(200)
				.then(({ body }) => {
					expect(body).toEqual({ message: "Server is up" });
				});
		});
	});
});

describe("/api/topics", () => {
	describe("GET", () => {
		test("200: Responds with an array on the topics key", () => {
			return supertest(app)
				.get("/api/topics")
				.expect(200)
				.then(({ body }) => {
					expect(Array.isArray(body.topics)).toBe(true);
				});
		});

		test("200: Responds with an array of topics with the properties 'slug' and 'description'", () => {
			return supertest(app)
				.get("/api/topics")
				.expect(200)
				.then(({ body }) => {
					expect(body.topics.length).toBeGreaterThan(0);
					body.topics.forEach((topic) => {
						expect(topic).toHaveProperty("slug");
						expect(topic).toHaveProperty("description");
					});
				});
		});
	});

	describe("POST", () => {
		test("501: Responds with an error object with a message 501 Not Implemented", () => {
			return supertest(app)
				.post("/api/topics")
				.expect(501)
				.then(({ body }) => {
					expect(body).toHaveProperty("error");
					expect(body.error).toHaveProperty("message");
					expect(body.error.message).toEqual("501 Not Implemented");
				});
		});
	});
});

describe("/api/articles/:article_id", () => {
	describe("GET", () => {
		test("200: Responds with an article object", () => {
			return supertest(app)
				.get("/api/articles/1")
				.expect(200)
				.then(({ body }) => {
					expect(body).toHaveProperty("article");
				});
		});

		test("200: Responds with an article object with the properties 'author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes'", () => {
			return supertest(app)
				.get("/api/articles/1")
				.expect(200)
				.then(({ body }) => {
					expect(body.article.author).toBe("butter_bridge");
					expect(body.article.title).toBe("Living in the shadow of a great man");
					expect(body.article.article_id).toBe(1);
					expect(body.article.body).toBe("I find this existence challenging");
					expect(body.article.topic).toBe("mitch");
					expect(body.article.created_at).toBe("2020-07-09T20:11:00.000Z");
					expect(body.article.votes).toBe(100);
				});
		});

		test("400: Responds with 'Invalid ID' when the request ID is not a number", () => {
			return supertest(app)
				.get("/api/articles/one")
				.expect(400)
				.then(({ body }) => {
					expect(body).toEqual({ error: { code: 400, message: 'Bad Request' } });
				});
		});

		test("404: Responds with 404 when the ID is valid but no article is found", () => {
			return supertest(app)
				.get("/api/articles/9999")
				.expect(404)
				.then(({ body }) => {
					expect(body).toEqual({ error: { code: 404, message: 'No article found' } });
				});
		});
	});

	describe("POST", () => {
		test("405: Responds with a message 'Method not allowed' for POST requests", () => {
			return supertest(app)
				.post("/api/articles/1")
				.expect(405)
				.then(({ body }) => {
					expect(body).toEqual({ error: { code: 405, message: "Method not allowed" } });
				});
		});
	});

	describe("PATCH", () => {
		test("201: Responds with the updated article with the vote_count increased by 1", () => {
			return supertest(app)
				.patch("/api/articles/1")
				.expect(201)
				.send({ inc_votes: 1 })
				.then(({ body }) => {
					expect(body).toEqual({
						article: {
							article_id: 1,
							title: "Living in the shadow of a great man",
							topic: "mitch",
							author: "butter_bridge",
							body: "I find this existence challenging",
							created_at: "2020-07-09T20:11:00.000Z",
							votes: 101
						}
					});
				});
		});

		test("201: Responds with the updated article with the vote_count increased by 99", () => {
			return supertest(app)
				.patch("/api/articles/1")
				.expect(201)
				.send({ inc_votes: 99 })
				.then(({ body }) => {
					expect(body).toEqual({
						article: {
							article_id: 1,
							title: "Living in the shadow of a great man",
							topic: "mitch",
							author: "butter_bridge",
							body: "I find this existence challenging",
							created_at: "2020-07-09T20:11:00.000Z",
							votes: 199
						}
					});
				});
		});

		test("201: Responds with the updated article with the vote_count decreased by -1", () => {
			return supertest(app)
				.patch("/api/articles/1")
				.expect(201)
				.send({ inc_votes: -1 })
				.then(({ body }) => {
					expect(body).toEqual({
						article: {
							article_id: 1,
							title: "Living in the shadow of a great man",
							topic: "mitch",
							author: "butter_bridge",
							body: "I find this existence challenging",
							created_at: "2020-07-09T20:11:00.000Z",
							votes: 99
						}
					});
				});
		});

		test("400: Responds with a message 'Bad Request' when inc_votes is a String", () => {
			return supertest(app)
				.patch("/api/articles/1")
				.expect(400)
				.send({ inc_votes: "one" })
				.then(({ body }) => {
					expect(body).toEqual({
						error: {
							code: 400,
							message: "Bad Request"
						}
					});
				});
		});

		test("400: Responds with a message 'Invalid ID' when article_id is a String", () => {
			return supertest(app)
				.patch("/api/articles/one")
				.expect(400)
				.send({ inc_votes: 1 })
				.then(({ body }) => {
					expect(body).toEqual({
						error: {
							code: 400,
							message: "Bad Request"
						}
					});
				});
		});

		test("400: Responds with a message 'Bad Request' when inc_votes is not in the body", () => {
			return supertest(app)
				.patch("/api/articles/1")
				.expect(400)
				.send({})
				.then(({ body }) => {
					expect(body).toEqual({
						error: {
							code: 400,
							message: "Bad Request"
						}
					});
				});
		});

		test("400: Responds with a message 'Bad Request' when inc_votes and one more property is in the body", () => {
			return supertest(app)
				.patch("/api/articles/1")
				.expect(400)
				.send({
					inc_votes: 1,
					invalid: "Invalid"
				})
				.then(({ body }) => {
					expect(body).toEqual({
						error: {
							code: 400,
							message: "Bad Request"
						}
					});
				});
		});

		test("404: Responds with a message 'No article found' when the request is valid but the article_id isn't found", () => {
			return supertest(app)
				.patch("/api/articles/9999")
				.expect(404)
				.send({
					inc_votes: 1,
				})
				.then(({ body }) => {
					expect(body).toEqual({
						error: {
							code: 404,
							message: "No article found"
						}
					});
				});
		});
	});

	describe("DELETE", () => {
		test("405: Responds with a message 'Method not allowed' for DELETE requests", () => {
			return supertest(app)
				.delete("/api/articles/1")
				.expect(405)
				.then(({ body }) => {
					expect(body).toEqual({ error: { code: 405, message: "Method not allowed" } });
				});
		});
	});
});

describe("/api/users", () => {
	describe("GET", () => {
		test("200: Responds with an array on the users property", () => {
			return supertest(app)
				.get("/api/users")
				.expect(200)
				.then(({ body }) => {
					expect(Array.isArray(body.users)).toBe(true);
				});
		});

		test("200: Check users have the correct properties 'username', 'name' and 'avatar_url'", () => {
			return supertest(app)
				.get("/api/users")
				.expect(200)
				.then(({ body }) => {
					expect(body.users.length).toBeGreaterThan(0);
					body.users.forEach((user) => {
						expect(user).toHaveProperty("username");
						expect(user).toHaveProperty("name");
						expect(user).toHaveProperty("avatar_url");
					});
				});
		});
	});
});