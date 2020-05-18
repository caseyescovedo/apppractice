const { Pool } = require('pg')
;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://hqrvdmil:ywWmLLrWGO0RdDNN_JqmL5uROPvjsi72@raja.db.elephantsql.com:5432/hqrvdmil';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

// Database schema 
// table name = Task 
// columns = id, item, created_at (defaults to current time)
/*
CREATE TABLE Task (
  id serial PRIMARY KEY,
  item VARCHAR (255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  username VARCHAR (150) NOT NULL   
)
*/

module.exports = {
  query: (text, params, cb) => {
    return pool.query(text, params, cb);
  }
}; // <-- export your model
