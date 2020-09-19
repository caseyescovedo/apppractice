const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://statsech:STsCWypJC1-iYB_Cfg7cGelejt4aaiNm@lallah.db.elephantsql.com:5432/statsech';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
 const URI = process.env.PG_URI || myURI;

 const pool = new Pool({connectionString: URI})


module.exports = {
  query: (text, parameter, callback) => {
    console.log('Querying Assessment database');
    return pool.query(text,parameter,callback)
  }
}; 
