const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://sjzkzwub:p8YCi3McOnxT8cDc6-_J1uzycsvto55x@lallah.db.elephantsql.com:5432/sjzkzwub';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

// below CREATE TABLE Task is for reference only, I created the db using ElephantSQL in browser
const task = `
CREATE TABLE Task (
  ID SERIAL,
  item TEXT,
  created_at TIME DEFAULT CURRENT_TIME
);
`

// <-- export your model
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};; 
