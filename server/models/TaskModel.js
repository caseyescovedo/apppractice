// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://jhncnvfh:d6_uNHZmxr110rH1-gWCZO2JI_KwyOdv@ruby.db.elephantsql.com:5432/jhncnvfh';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: URI
})

module.exports = {
    query: (text, params, cb) => {
        console.log('Executed query', text);
        return pool.query(text, params, cb);
    }
}