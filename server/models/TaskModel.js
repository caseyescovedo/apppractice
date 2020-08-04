const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://uecvjrdq:ia-P3bf-VLbG5vmGsFKnBQwuYWTDqr3h@ruby.db.elephantsql.com:5432/uecvjrdq';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (query, params, cb) => {
    console.log('PSQL: ', query);
    return pool.query(query, params, cb);
  },
}; // <-- export your model
