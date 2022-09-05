const app = require("../app/app.js");
const supertest = require("supertest");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");

beforeAll(() => {
	return seed(testData);
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