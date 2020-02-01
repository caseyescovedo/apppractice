const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://wjezjkmg:w3HfRsWWRUyvpRg0COhWBaV52UVPgfhl@rajje.db.elephantsql.com:5432/wjezjkmg';

const pool = new Pool({connectionString: myURI})

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const queryString = 'CREATE TABLE IF NOT EXISTS Task (id SERIAL PRIMARY KEY, item VARCHAR)';


module.exports = { query: (text, params, callback) => {
  console.log('The query is ', text)
  return pool.query(text, params, callback)
  }
}

