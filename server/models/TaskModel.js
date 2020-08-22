const { Pool } = require('pg');
const queries = require('../utils/queries.js');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;


// Create a new pool
const pool = new Pool({
  connectionString: URI
});

// Create table if they do not already exist
pool.connect((err, client, release) => {
  if (err) return console.error('Error acquiring client', err.stack);
  client.query(queries.createTable, (err, result) => {
    // Release the client as we've finished our query
    release();
    if (err) return console.error('Error executing createTable', err.stack);
    console.log('Successfully checked task table');
  });
});

// Added console.log for easier debugging
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
