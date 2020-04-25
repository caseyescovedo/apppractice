const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://sykcqbpp:Jm47BEorJ9c1M4_K23opih6q91nfL1ok@drona.db.elephantsql.com:5432/sykcqbpp';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;


const pool = new Pool({
  connectionString: URI
});

module.exports = {
  query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback)
  }
}