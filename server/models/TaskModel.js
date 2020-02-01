const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://weckamot:PWN4q_OSkmUtp0s1YYvRzERlznx02beC@rajje.db.elephantsql.com:5432/weckamot';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;


const pool = new Pool({
  connectionString: URI,
});

// creating table to store todo tasks
const taskQueryString = 'CREATE TABLE IF NOT EXISTS Task (id SERIAL PRIMARY KEY, item VARCHAR, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)';

pool.query(taskQueryString);

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query ', text);
    return pool.query(text, params, callback);
  }
}; // <-- export your model
