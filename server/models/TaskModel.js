const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// // v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@ruby.db.elephantsql.com:5432/${process.env.USERNAME}`;

// // UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// // UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// create a new pool with the connectionString property set to the database URI
const pool = new Pool({
  connectionString: 'removed for git push'
});

// Export an object with the query property as a function that logs the query
// and then returns pool.query() with the same arguments passed in
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
