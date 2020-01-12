const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'postgres://lasuhdqy:u1MHZw5oAGo8QNnb1uK-5Vj507GPsknT@rajje.db.elephantsql.com:5432/lasuhdqy';

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

const pool = new Pool({
  connectionString: myURI
});

module.exports = {
  query: (text, values, callback) => {
    console.log('executed query ', text);
    return pool.query(text, values, callback);
  }
}; // <-- export your model

/*
CREATE TABLE "task" (
	"id" serial NOT NULL,
	"item" varchar(255) NOT NULL,
	"created_at" TIMESTAMP NULL,
	CONSTRAINT "task_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
)
*/
