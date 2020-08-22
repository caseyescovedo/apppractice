const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'postgres://tkvgraqh:RZV-f_I1m_bWbLTP7soLIhS0UWKNh_4d@lallah.db.elephantsql.com:5432/tkvgraqh';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
}; // <-- export your model

/*

Create Task Table:

CREATE TABLE Task(
   _id SERIAL PRIMARY KEY,
   item VARCHAR,
   created_at TIMESTAMP
);

*/
