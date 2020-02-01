const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://iqvpegxa:rFoVHbN_7s7eUL__d8X0Zyb_LayrBK59@rajje.db.elephantsql.com:5432/iqvpegxa';

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

const noteTable = `CREATE TABLE IF NOT EXISTS Tasks (
  id SERIAL primary key,
  item VARCHAR NOT NULL,
  created_at timestamp default CURRENT_TIMESTAMP
  )`;

pool.query(noteTable, (err) => {
  console.log('created tasks table');
  if (err) console.log(`There was an error: ${err}`);
});

module.exports = {
  query: (string, params, callback) => {
    console.log(`executed query ${string}`);
    pool.query(string, params, callback);
  },
}; // <-- export your model
