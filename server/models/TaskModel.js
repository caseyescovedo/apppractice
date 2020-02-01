const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://cwptlhwo:ewbTP-39LWCD6CGmFB6SCCh9uDwO5_Wv@rajje.db.elephantsql.com:5432/cwptlhwo';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});


module.exports = { // <-- export your model
  query: (text, params, callback) => {
    console.log(`Executed query:\n${text}`);
    return pool.query(text, params, callback);
  },
};
