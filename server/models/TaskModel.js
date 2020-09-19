// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const myURI = 'postgres://laigsihu:23OlFg0yk0rGNFhHyeOouj244EPEUmA9@lallah.db.elephantsql.com:5432/laigsihu';
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({ connectionString: myURI });


module.exports = {
  query: function(text, params, func) {
    return pool.query(text, params, func);
  }
}; // <-- export your model
