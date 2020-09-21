// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://bfrcgbcz:1ctiXU4cqWmXPnujDt86lumBFVpPSo-4@lallah.db.elephantsql.com:5432/bfrcgbcz';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const { Pool } = require('pg')

const pool = new Pool({connectionString: myURI})



// create a table 
// CREATE TABLE Task (item_id SERIAL PRIMARY KEY, item varchar(100),  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

module.exports = {
    query: (text, params, cb)=>{
        return pool.query(text, params, cb)
    }
}; // <-- export your model
