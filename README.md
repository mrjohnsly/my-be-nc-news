# Northcoders News API

## Installation

Prerequisites:
* [Node & NPM](https://nodejs.org/)
* [PostgresSQL](https://www.postgresql.org)

Clone the repository:
```
git clone git@github.com:mrjohnsly/my-be-nc-news.git
```

Install NPM dependencies
```
npm ci
```

Create 2 enivornment files to store the Postgres Database credentials. One for the test database used by Jest and one development database used when running the server locally:

`.env.test`
```
PGDATABASE=nc_news_test
```

`.env.development`
```
PGDATABASE=nc_news
```

Run the provided SQL script to setup the two databases:
```
npm run setup-dbs
```

Seed the development database with required tables, columns and data:
```
npm run seed
```