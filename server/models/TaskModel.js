const { Pool } = require("pg");

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://oxjuukoy:QTqgC4gBoCvdT0SsnLUjaWZ_TZK7BxCm@ruby.db.elephantsql.com:5432/oxjuukoy';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI
});


module.exports = {
  query: (text, params, cb) => {
    console.log(`Executed query: `, text);
    return pool.query(text, params, cb);
  }
}; // <-- export your model
