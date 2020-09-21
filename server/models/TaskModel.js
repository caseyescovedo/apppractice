// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');

const myURI =
  'postgres://pffxxifk:GOiRBlzNhhnOy_9zghXYiWjAk0OE6WOO@lallah.db.elephantsql.com:5432/pffxxifk';

const pool = new Pool({
  connectionString: myURI,
});

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

module.exports = {
  query: function (text, params, cb) {
    return pool.query(text, params, cb);
  },
};
