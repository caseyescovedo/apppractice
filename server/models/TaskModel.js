const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://epdhxvyy:ayJRWk6xIukvJb8-5tzANg6fEQDAQ0W8@rajje.db.elephantsql.com:5432/epdhxvyy';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
    connectionString: myURI,
  });
  
pool.query(`CREATE TABLE IF NOT EXISTS Task(
    item VARCHAR(255) NOT NULL, 
    created_at DATE DEFAULT CURRENT_TIMESTAMP
);`);

module.exports = { 
    query: function(query, params, func){
    return pool.query(query, params, func);
  },
}; // <-- export your model
