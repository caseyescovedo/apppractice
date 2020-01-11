// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');

const myURI = 'postgres://xqclcxwk:t9v9Qf2PuLVnXYtFH17XSc9Rt7sqx7Qw@rajje.db.elephantsql.com:5432/xqclcxwk';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;


// CREATE TABLE task (
// item_id serial PRIMARY KEY,
// item VARCHAR (50) NOT NULL,
// created_at TIMESTAMP DEFAULT NOW()
// );

const pool = new Pool({
  connectionString: URI,
})

module.exports = {
  query: (query, params, callback) => {
    console.log(`query being executed: ${query}`);
    return pool.query(query, params, callback);
  }
}
// <-- export your model
