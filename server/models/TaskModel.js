// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://kjfuwdud:wxBaI_MfUUnpG5SWjATjo0i06hFCHBwE@lallah.db.elephantsql.com:5432/kjfuwdud';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

/** ===== Require Pool from node-postgress ===== */
const { Pool } = require('pg');

/** ===== Create new instance of Pool ===== */
const pool = new Pool({
  connectionString: URI,
});

/** ===== Export model ===== */
module.exports = {
  query: (queryString, params, cb) => {
    return pool.query(queryString, params, cb);
  },
};
