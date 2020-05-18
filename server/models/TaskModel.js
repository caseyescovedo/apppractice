const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://yftzfgri:HcLnVzfPjLdUmSoNkHVSUzICpzq7MAXj@isilo.db.elephantsql.com:5432/yftzfgri';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

module.exports = new Pool({ connectionString: URI })
