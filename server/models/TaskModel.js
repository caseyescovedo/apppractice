// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const PG_URL =
'postgres://zxlauunl:iJ9_0AcU-LKqxvPqGEyEXm8cFEwtG8gU@lallah.db.elephantsql.com:5432/zxlauunl';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
 const URI = process.env.PG_URI;

 const pool = new Pool({ connectionString: PG_URL });


 module.exports = {
  query: function (text, params, cb) {
    return pool.query(text, params, cb);
  },
}; // <-- export your model
