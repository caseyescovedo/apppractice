const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '	postgres://edkfroyu:l8xLfho4yF_JdyPn2Ncu5HIC-x32lftO@isilo.db.elephantsql.com:5432/edkfroyu';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString : URI,
})

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed the following query: ', text);
    return pool.query(text, params, callback);
  }
}; // <-- export your model
