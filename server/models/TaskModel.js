const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'postgres://hwajqhiq:DcEiD0R9whqEXXYwnh4nkrn-Ge7ODsKb@lallah.db.elephantsql.com:5432/hwajqhiq';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({ connectionString: myURI });

module.exports = {
  query: function (text, params, cb) {
    return pool.query(text, params, cb);
  },
};
