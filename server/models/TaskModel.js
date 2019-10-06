const { Pool } = require('pg')

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://nuumigqz:p2b-4xxcn_XIRRX6Ae2Ri85-QF_xqU-8@salt.db.elephantsql.com:5432/nuumigqz';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: myURI
})


module.exports = pool; // <-- export your model
