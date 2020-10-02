const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '	postgres://zdbyqiqj:9DoLL8oK0BII0890txZ3grQMSLj7l_Uy@lallah.db.elephantsql.com:5432/zdbyqiqj';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({connectionString: URI});

module.exports = {
  query: function(text, params, cb) {
    return pool.query(text, params, cb)
  }
}; 
