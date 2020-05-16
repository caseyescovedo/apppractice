const { Pool } = require('pg')

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://irdbqpcc:4_EdzNFw0Ynvi4YAjr120ZFlzhEGjuwE@isilo.db.elephantsql.com:5432/irdbqpcc';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// iniitialize pool and client with connection string
const pool = new Pool({
  connectionString: URI
})

pool.connect()





module.exports = pool;
// module.exports = null; // <-- export your model
