// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://pdqcdfpv:6vcNnIcIkzRP4y5QtZniLpV4xhpJkpsT@rajje.db.elephantsql.com:5432/pdqcdfpv';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const { Pool } = require('pg');
// connect to database
const pool = new Pool({ connectionString: URI });

pool.on('connect', () => console.log('Connection to database is working'));



module.exports = {
  query: (query, params, callback) => {
    // console.log(`here is query ${query}`);
    return pool.query(query, params, callback);
  },
};

// CREATE TABLE Tasks (
//   id SERIAL PRIMARY KEY not null,
//   item VARCHAR not null,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// ) 