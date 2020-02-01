const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://efqtcucf:jBtgw9F7s8jc-pFma1PYAEePVg-pZPbg@rajje.db.elephantsql.com:5432/efqtcucf';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({ connectionString: URI });

const query = 'CREATE TABLE IF NOT EXISTS task (id SERIAL PRIMARY KEY, item VARCHAR, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)';

pool.query(query, (err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = {
  query: (text, params, callback) => {
    console.log('QUERY: ', text);
    return pool.query(text, params, callback);
  },
};
