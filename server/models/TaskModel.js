const { Pool } = require('pg')


// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://lhmopfvv:tqjNPEE1x3cIusNHnHngy0f32yjhF_TB@rajje.db.elephantsql.com:5432/lhmopfvv';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

//querystring so there will the system don't create a new table. 
const queryString = 'CREATE TABLE IF NOT EXISTS Task (id SERIAL PRIMARY KEY, item VARCHAR, created_at TIMESTAMP)';

const pool = new Pool({ connectionString: myURI });

pool.query(queryString, (err) => {
    if(err) console.log(err)
});

module.exports = { 
    query: (text, params, callback) => {
        console.log('executed query is', text);
        return pool.query(text, params, callback)
} }; // <-- export your model
