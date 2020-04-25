// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://ixzghwnl:trHsEIXxYc5wB0gcITG-5aNhPLCrMyxw@drona.db.elephantsql.com:5432/ixzghwnl';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: URI,
});

pool.connect();

module.exports = pool; // <-- export your model
