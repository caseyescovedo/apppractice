// REQUIRE PG
const { Pool } = require('pg');
const myURI =
  'postgres://qgzuadag:zVharApNEAn2odZQorxLvSzg0k5kjHry@lallah.db.elephantsql.com:5432/qgzuadag';

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({ connectionString: URI });

module.exports = {
  query: function (text, params, cb) {
    return pool.query(text, params, cb);
  },
};

// CREATE TABLE QUERY CALLED Tasks with _id, item, and timestamp

// CREATE TABLE Tasks (_id SERIAL PRIMARY KEY, item VARCHAR(200) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW());

// INSERT VALUE TO TEST
// INSERT INTO tasks (item) VALUES ('Finish Part2 Assessment');
// INSERT INTO tasks (item) VALUES ('Drink Beer once complete');

// DELETE VALUE TEST
// DELETE FROM tasks WHERE _id = 2 RETURNING *;
