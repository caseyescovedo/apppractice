// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://tckclrgc:pwivedVvFU00GvzK2n7WO9feVxDKeh4s@rajje.db.elephantsql.com:5432/tckclrgc';
// Table created in ElephantSQL using this query string:
// CREATE TABLE Task (
//   item varchar(100) NOT NULL,
//   created_at timestamp
// );

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// create a connection pool using my ElephantSQL link
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: myURI
});

// export the pool.query method
module.exports = {
  query: (text, params, callback) => {
    console.log('query string: ', text);
    return pool.query(text, params, callback);
  },
}; // <-- export your model

// Documentation used:
// https://www.postgresql.org/docs/9.1/sql-createtable.html
// https://node-postgres.com/api/pool
