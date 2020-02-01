// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://tlacfhfy:bUQm3cbXVhcdfa5fULAqfB66yxrmHvG5@rajje.db.elephantsql.com:5432/tlacfhfy';
const { Pool } = require('pg');
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const banana = new Pool({
  connectionString: myURI,
});

const queryString = 'CREATE TABLE IF NOT EXISTS todolist (id SERIAL PRIMARY KEY, task TEXT)';
const authString = 'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT, password TEXT)';

banana.query(queryString, (err) => {
  if (err) console.log('Error in creation of table. Error is:', err);
});

banana.query(authString, (err) => {
  if (err) console.log('Error in creation of table. Error is:', err);
});


module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query:', text);
    return banana.query(text, params, callback);
  },
}; // <-- export your model
