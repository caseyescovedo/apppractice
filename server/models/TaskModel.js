const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'postgres://wrsrhldo:Y93j2Qy2ocFnuuNuNfqWhRbkDd_4FQ0S@otto.db.elephantsql.com:5432/wrsrhldo';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI
});

module.exports = pool; // <-- export your model
