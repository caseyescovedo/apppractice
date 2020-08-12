const { Pool } = require("pg");

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://cnvqojef:1paBLBEUdrDwV8UjlGzERdQHgGP8_Qz3@rajje.db.elephantsql.com:5432/cnvqojef';

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});


module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};  // <-- export your model
