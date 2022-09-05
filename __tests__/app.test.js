const app = require("../app/app.js");
const supertest = require("supertest");
const seed = require("../db/seeds/run-seed.js");
const db = require("../db/connection.js");

beforeAll(() => {
	return seed();
});