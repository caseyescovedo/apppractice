// destructing element Pool from pg
const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI

const myURI =
  'postgres://wawmqhrk:LMpIbO4PSF0JjEvrs4qOXG1VOa1ZkhDe@lallah.db.elephantsql.com:5432/wawmqhrk';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;
// linking the connection to our URI
const pool = new Pool({ connectionString: URI });

module.exports = {
  query: function (text, params, cb) {
    return pool.query(text, params, cb);
  },
}; // <-- export your model
