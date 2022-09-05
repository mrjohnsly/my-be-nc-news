const app = require("../app/app.js");
const supertest = require("supertest");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");

beforeAll(() => {
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
	});
});