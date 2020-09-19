const { Pool } = require("pg");

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://oqkanyng:2Iy8gBPmiZMb3qpPQHSUEIFW-_RkJUEn@lallah.db.elephantsql.com:5432/oqkanyng';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// Create pool for db
const pool = new Pool({
  connectionString: URI
});

// Table created in ElephantSQL w/ following query
// CREATE TABLE Task (_id SERIAL PRIMARY KEY, item VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW()); 

// Query function to export 
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query:', text);
    return pool.query(text, params, callback);
  }
}; // <-- export your model
