// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://xqmwtfrp:82d2T_hLF3BPY3g2osoHCtzDbGa_8Wov@salt.db.elephantsql.com:5432/xqmwtfrp';
const { Pool } = require('pg')
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
    URI: URI,
    ssl: 'developement',
  })



module.exports = { pool }; // <-- export your model
