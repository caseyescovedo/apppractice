// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg')

const myURI = 'postgres://dldlmlki:VciMBp5y1pUDPOsr5deCRlcckCExP80K@drona.db.elephantsql.com:5432/dldlmlki';

const pool = new Pool({
  connectionString: myURI
})

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

module.exports = pool; // <-- export your model
