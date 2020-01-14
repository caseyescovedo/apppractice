const { Pool } = require('pg')

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://cscxdtrl:FRQKJPFopZLFiuoaaRk3w3RULbGgG8XW@rajje.db.elephantsql.com:5432/cscxdtrl';

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
    connectionString: myURI
})



module.exports = {
    query: (text, params, callback) => {
        console.log('you have executed your query:', text);
        return pool.query(text, params, callback)
    }
}; // <-- export your model
