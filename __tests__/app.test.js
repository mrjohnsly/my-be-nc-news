const app = require("../app/app.js");
const supertest = require("supertest");
const seed = require("../db/seeds/run-seed.js");
const db = require("../db/connection.js");

beforeAll(() => {
	return seed();
});

describe("/api", () => {
	describe("GET", () => {
		test("200: Responds with a message 'Server is up'", () => {
			return supertest(app)
				.get("/api")
				.expect(200)
				.then((response) => {
					expect(response).toBe({ message: "Server is up" });
				});
		});
	});
});