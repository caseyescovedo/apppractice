const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'postgres://dgzurdtn:o_XO8GYTuEi7Tt4xb14x2revTxgo4i79@ruby.db.elephantsql.com:5432/dgzurdtn';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Executing DB Query', text, params);
    return pool.query(text, params, callback);
  },
}; // <-- export your model
