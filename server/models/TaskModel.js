const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://qcvnbwah:gPvlnZHal1v-6F9g916Y34CrfW2i0EkW@rajje.db.elephantsql.com:5432/qcvnbwah';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
const pool = new Pool ({
  connectionString: myURI
});


module.exports = {
  query: (text, values, callback) => {
    console.log('Executed query', text);
    return pool.query(text, values, callback);
  }
}; // <-- export your model
