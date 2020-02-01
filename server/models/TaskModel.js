const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '	postgres://ywiyffgt:uJDIaidZG35iXASKOKlq9hRid0WaJjam@rajje.db.elephantsql.com:5432/ywiyffgt';


const pool = new Pool({connectionString : myURI});

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
//const URI = process.env.PG_URI || myURI;

// create Table if it does not exist in the DB
const queryCreate = 'CREATE TABLE IF NOT EXISTS Task (id SERIAL PRIMARY KEY, item VARCHAR, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)'

pool.query(queryCreate, (err) => {
    if(err) console.log(err)
});


module.exports = { 
    query: (text, params, callback) => {
        console.log('The executed query is', text);
        return pool.query(text, params, callback)
} }; // <-- export your model
