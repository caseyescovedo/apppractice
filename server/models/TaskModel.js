const { Pool } = require("pg");
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  "	postgres://iyevpeem:bkNH11rZAl_k6BtZWo3lUQWy4VzqMcdQ@lallah.db.elephantsql.com:5432/iyevpeem";

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}; // <-- export your model
