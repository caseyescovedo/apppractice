const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://rtbyyoau:7XJKIqaR9fe6scW72Qe4wNsv2nxDk_9x@drona.db.elephantsql.com:5432/rtbyyoau';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;



const pool = new Pool ({
    connectionString: URI
});

module.exports = {
  query: (text,params,callback) =>{
      console.log('expected query', text);
      return pool.query(text,params,callback);
  }
};