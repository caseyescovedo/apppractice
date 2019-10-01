const Pool = require('pg').Pool;
const conString = 'postgres://nyopedvy:XwkWfSkRfWHOM5g2tdVBW-Si1vMX_gUW@salt.db.elephantsql.com:5432/nyopedvy'
const pool = new Pool({
  connectionString: conString
});

const newTable = `CREATE TABLE IF NOT EXISTS Tasks (
  _id serial PRIMARY KEY,
  item VARCHAR,
  created_at TIME NOT NULL DEFAULT CURRENT_TIME
)`

pool.query(newTable, (err, result) => {
  if(err) {
    console.error(err);
  }
  console.log('created table if didn\'t exist');
})



// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://nyopedvy:XwkWfSkRfWHOM5g2tdVBW-Si1vMX_gUW@salt.db.elephantsql.com:5432/nyopedvy';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;




module.exports = pool; // <-- export your model
