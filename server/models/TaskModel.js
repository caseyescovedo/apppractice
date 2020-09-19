// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://jbxyapjn:KxVIQ1SrrNyiiiX3RNkppi3w17oFZ5Ah@lallah.db.elephantsql.com:5432/jbxyapjn';
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// might need to work on this
const { Pool } = require('pg');
const db = new Pool({
    connectionString: myURI,
})


module.exports = {
    query: (text, value, callback) => db.query(text, value, callback),
};
