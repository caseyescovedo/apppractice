const { Pool } = require('pg');
const queries = require('../utils/queries.js');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '	postgres://sulbsdqp:grByPMjPRX6U08gH6heZLPXupp9IyeLz@lallah.db.elephantsql.com:5432/sulbsdqp';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;


// create a new pool
const pool = new Pool({
  connectionString: URI
});

// Create tables if they do not already exist
pool.connect((err, client, release) => {
  if (err) return console.error('Error acquiring client', err.stack);
  client.query(queries.createTable, (err, result) => {
    release();
    if (err) return console.error('Error executing createTable', err.stack);
    console.log('Successfully checked task table');
  })
})

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
