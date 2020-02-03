const { Pool } = require('pg');

const myURI =
  'postgres://sypekhae:g6QRzfih0khnkER1LeHdns51iTR3gMnI@rajje.db.elephantsql.com:5432/sypekhae';

const URI = process.env.PG_URI || myURI;

//connect to the database:
//pool takes a k:v pair to take in the connectionString for the db
const pool = new Pool({
  connectionString: URI
});

// create the table by running a db.query with the queryString initially
// ** not sure how to have created_at select the specific time each time a new entry is made to the database
// const date = Date.now();
// const arr = [date];
const Task =
  'CREATE TABLE IF NOT EXISTS task (id SERIAL PRIMARY KEY, item VARCHAR NOT NULL, created_at DATE)';
//query to create the table once:
pool.query(
  Task,
  /*arr,*/ (err) => {
    if (err) console.log('there was an error creating the Task table');
    console.log('connected to the database');
  }
);

//export the database so that we can query it elsewhere
module.exports = {
  query(queryString, params, callback) {
    console.log('ran a query: ', queryString);
    return pool.query(queryString, params, callback);
  }
};
