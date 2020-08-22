const { Pool } = require('pg');
// const PG_URI = 'postgres://buznmnmj:qq11puDFruBwUZgh7kGJ0nEuLLtSjAlQ@lallah.db.elephantsql.com:5432/buznmnmj';
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://buznmnmj:qq11puDFruBwUZgh7kGJ0nEuLLtSjAlQ@lallah.db.elephantsql.com:5432/buznmnmj';

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
  };

