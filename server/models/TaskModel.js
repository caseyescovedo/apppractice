const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://bseyhdnj:wQHgBPjhekJ5BgoFKGN_ry_dYUo_ArT1@rajje.db.elephantsql.com:5432/bseyhdnj';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;



const pool = new Pool({
    connectionString: URI
})

module.exports = {
    query: (text, values, callback) =>{
        return pool.query(text, values, callback)
    }
};
