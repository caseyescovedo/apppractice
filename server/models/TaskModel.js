// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const myURI = '	postgres://lhihqdjw:5WPxYtvucCRSiqbXnkgq43dtNYQOUvMV@lallah.db.elephantsql.com:5432/lhihqdjw';


// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({connectionString: myURI});


module.exports = {
    query: function(text, params, cb) {
        return pool.query(text, params, cb);
    }
}; 
// <-- export your model


// CREATE TABLE task (_id SERIAL PRIMARY KEY, item VARCHAR(200) NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
// INSERT INTO task (item) VALUES ('Study coding');