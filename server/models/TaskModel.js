// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const myURI = 'postgres://qvfbhxdm:zsYx-aMSa32v1cdvNtW43yQWaYM_uoAT@lallah.db.elephantsql.com:5432/qvfbhxdm';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// Creating an instance of Pool
const pool = new Pool({
    connectionString: URI,
})

/**
 * 
 Only uncomment below when you are using a new database.
 It already has a table in the database.
 */

// let createTaskQuery = `
// CREATE TABLE Task
// (
//   "id" serial PRIMARY KEY,
//   "item" varchar NOT NULL CHECK ( item <> ''),
//   "timestamp" timestamp default current_timestamp
// );
// `
// pool.query(createTaskQuery)
// .then(data => {
//     console.log(data);
//     console.log('hi');
// })
// .catch(err => {
//     console.log('error');
// })


module.exports = {
    query: (text, params, callback) => {
        console.log('query executed', text);
        return pool.query(text,params, callback);
    }

}; // <-- export your model
