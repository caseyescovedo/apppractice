// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');

const myURI =
  'postgres://dhktrnht:SG8LqUqOGdmgYIkID8x8hPQ1HTYxfeO_@lallah.db.elephantsql.com:5432/dhktrnht';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({ connectionString: URI });

module.exports = {
  query(text, params, cb) {
    return pool.query(text, params, cb);
  },
}; // <-- export your model
