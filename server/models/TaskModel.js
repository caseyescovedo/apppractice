const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://fngtsymc:g-23g5EJ3tBQGYqXqvApbGjiIiqDq6yd@salt.db.elephantsql.com:5432/fngtsymc';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// create instance of pool
const pool = new Pool({
  connectionString: URI,
});

// connect to database
// pool.connect();
// I think the database is already connected

// create a table if not exists
const tableCreationQuery = 'CREATE TABLE IF NOT EXISTS Tasks (_id serial primary key, item varchar, created_at time)';

pool.query(tableCreationQuery, (err, response) => {
  if (err) {
    return console.error(err);
  }
  console.log('table created');
});

module.exports = pool; // <-- export your model
