const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://qtrjnoyf:StzWFjt63gCOCPgHD8S4hgKJBGL3gE4Z@rajje.db.elephantsql.com:5432/qtrjnoyf';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Task Model Text: ', text);
    return pool.query(text, params, callback);
  },
}; // <-- export your model
