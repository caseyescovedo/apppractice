// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://nwkfztwr:I1z58mSgn_SL6mc2u0ZwY5zGcq_VLPVB@lallah.db.elephantsql.com:5432/nwkfztwr';
const { Pool } = require('pg');

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
 const URI = process.env.PG_URI || myURI;

const pool = new Pool( { connectionString: myURI});


module.exports = {
  query: function (text, params, cb) {
    return pool.query(text, params, cb);
  },
}; // <-- export your model
