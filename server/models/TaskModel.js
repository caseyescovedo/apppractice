const { Pool } = require('pg')
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const PG_URI = 'postgres://dqsvyaly:YaBPNOzHJ7ivreh6gOnZMQxNIVdT01Td@rajje.db.elephantsql.com:5432/dqsvyaly';

const pool = new Pool({
  connectionString: PG_URI
})

const createTableString = 'CREATE TABLE IF NOT EXISTS Tasks (_id SERIAL PRIMARY KEY, item VARCHAR, created_at TIMESTAMP)'

pool.query(createTableString, (err) => {
  if (err) console.log('Error when creating table')
})

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || PG_URI;




module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
} // <-- export your model
