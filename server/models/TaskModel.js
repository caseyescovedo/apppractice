const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://iqzgopty:YKIPob3fxF_3yPa2ioTXf35wl83pUV08@lallah.db.elephantsql.com:5432/iqzgopty';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({ connectionString: URI });

module.exports = {
  query: (text, params, cb) => pool.query(text, params, cb),
};
