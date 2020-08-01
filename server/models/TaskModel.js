const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://hzjsojcz:u71iWGYBwVdkP38KmAQwyB2tMFDt23tX@ruby.db.elephantsql.com:5432/hzjsojcz';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: myURI,
});



module.exports = { 
  query: function (text, params, callback) {
    console.log(`Executing query: ${text}`);
    return pool.query(text, params, callback);
  }
};
