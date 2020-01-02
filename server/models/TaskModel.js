// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://inyvpgwm:Qgx-fAfX9VOxJUUAQkbwWk3D4pAixfhz@rajje.db.elephantsql.com:5432/inyvpgwm';

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: myURI
});

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

module.exports = {
  query: (textQuery, value, callback) => {
      return pool.query(textQuery, value, callback);
  }
}

// CREATE TABLE "tasks" (
// 	"id" serial NOT NULL UNIQUE,
// 	"item" VARCHAR(255) NOT NULL,
// 	"created_at" DATE NOT NULL,
// 	CONSTRAINT "todos_pk" PRIMARY KEY ("id")
// ) WITH (
//   OIDS=FALSE
// );

// insert into tasks (item, created_at)
// VALUES ($1, NOW())
// RETURNING *