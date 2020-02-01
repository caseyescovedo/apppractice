const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI
});

// //Testing
// pool.query('SELECT * FROM Task', null, (err, result) => {
//   console.log(result.rows);
// });

module.exports = pool; // <-- export your model
