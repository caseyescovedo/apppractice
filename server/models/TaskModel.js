const { Pool } = require("pg");
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  "postgres://rsobxnvb:QIoWPnfbYAVxwtHxInOTOudfXK280EUg@ruby.db.elephantsql.com:5432/rsobxnvb";

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

module.exports = pool; // <-- export your model
