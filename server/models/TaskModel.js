const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://mlqalfru:WqbcDMK4MskGiMnjJL_pxosj0dFAlqwm@rajje.db.elephantsql.com:5432/mlqalfru';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const pool = new Pool({
    connectionString: myURI
});


module.exports = {
    query: (text,params, callback) => {
        return pool.query(text,params,callback);
    }
};
