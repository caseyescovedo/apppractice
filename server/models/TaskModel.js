const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://palxtyhn:9F3g95aW4FkD40CnM97xJ2-34vI1hE_B@rajje.db.elephantsql.com:5432/palxtyhn';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

const taskTable = `
  CREATE TABLE IF NOT EXISTS Task (
    id SERIAL PRIMARY KEY,
    item VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(taskTable, (err) => {
  if (err) console.log(err);
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query ', text);
    return pool.query(text, params, callback);
  }
}; // <-- export your model
