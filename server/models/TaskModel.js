const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://xoeulozg:5hZUxc4ES7FfSgmotkWGStbL3qgJVEaa@lallah.db.elephantsql.com:5432/xoeulozg';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI
});

// pool.query(`
//   CREATE TABLE Task (
//     _id serial PRIMARY KEY,
//     item VARCHAR(255),
//     created_at timestamp DEFAULT NOW()
//   )`, (err, res) => {
//     console.log(err, res);
// });

// pool.query(`
//   INSERT INTO Task (item)
//   VALUES ('test2')
// `)

// pool.query(`DROP TABLE Task`);

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}; // <-- export your model
