// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const myURI =
  'postgres://qazcgwiu:tkTYNOpWRAKQU1NZ4hDXpe_BMVBKtCCb@lallah.db.elephantsql.com:5432/qazcgwiu';

const pool = new Pool({ connectionString: myURI });
// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// I spent 45 min trying to connect to database using psql in terminal... SICK

module.exports = {
  query(text, params, cb) {
    return Pool.query(text, params, cb);
  },
};
