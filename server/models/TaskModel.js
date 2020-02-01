// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://nhhhfecf:3y1-FvQGw8gaiqtHaszGv36QvA2HcYVO@rajje.db.elephantsql.com:5432/nhhhfecf';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: URI,
});

const queryString = 'CREATE TABLE IF NOT EXISTS Tasks (id serial PRIMARY KEY, item VARCHAR NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)';


pool.query(queryString, (err, res) => {
    if (err) console.log('error creating a table: ', err);
});

pool.on('connect', () => {
    console.log('connected to db');
});

module.exports = {
    query: (text, params, query) => {
        console.log('query is: ', text);
        return pool.query(text, params, query);
    },
}; // <-- export your model
