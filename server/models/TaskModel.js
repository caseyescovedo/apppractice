// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const {Pool} = require('pg')
const myURI = 'postgres://lllacymv:3QUD-aXxFPeKBPS-R5vRlrycSQyHdOp2@rajje.db.elephantsql.com:5432/lllacymv';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;
const pool = new Pool({
    connectionString:URI
})



module.exports = {

    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
      }

}; // <-- export your model
