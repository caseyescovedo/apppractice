// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'postgres://lvbmvrha:knCf5UEakpt-3W4abzxkPsO9UiX9nQBY@lallah.db.elephantsql.com:5432/lvbmvrha';

const { Pool } = require('pg');
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;
// create new instance of Pool from pg
const pool = new Pool({ connectionString: URI });
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}; // <-- export your model
