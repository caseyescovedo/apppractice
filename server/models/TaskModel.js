// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } =  require('pg')
const myURI = 'postgres://oidemmai:9oZYc2yY_-ZUsfpQykdhdYgcH2kMwiLA@rajje.db.elephantsql.com:5432/oidemmai';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool ({
    connectionString: myURI,
})


module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}; // <-- export your model
