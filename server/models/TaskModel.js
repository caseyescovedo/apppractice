const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://gtpkmqsl:q4zGDDZjvgOn591Zs1RMkVm965R9P9nz@rajje.db.elephantsql.com:5432/gtpkmqsl';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;    // how does process.env work?? 
// And why will URI be assigned my myURI if myURI is defined? Because of order? 
// What if myURI and process.env.PG_URI order reversed?

const pool = new Pool({
  connectionString: URI
});

// create table
const createTable = 'CREATE TABLE IF NOT EXISTS Tasks (id SERIAL PRIMARY KEY, item VARCHAR NOT NULL, created_at TIMESTAMP);'
pool.query(createTable, (err, res) => {
  if (err) throw err;
  // console.log('res.rows[0]', res.rows[0])
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};




// const queryString = 
//   `CREATE TABLE tablename(
//     col1 datatype,
//     PRIMARY KEY (one or more columns)
//   )`