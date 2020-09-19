const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://ufnitrdx:gtSamdbVpsQB1wcjajFEZiJsfIWEd47w@lallah.db.elephantsql.com:5432/ufnitrdx';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

//NCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

//create a pool and user using connectionString
const pool = new Pool({connectionString: myURI});

//string to create table Tasks in db
const DB_INIT = `CREATE TABLE IF NOT EXISTS Tasks (
  id SERIAL PRIMARY KEY,
  item TEXT NOT NULL,
  created_at TIME NOT NULL DEFAULT current_time
  );`;

//create the tasks table in the db
pool.query(DB_INIT);

module.exports = {
  //allows the rest of our files to query the pool using <importName>.query
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};