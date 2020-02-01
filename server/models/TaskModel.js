// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const myURI = 'postgres://jklsviyi:36LqKmvjMNJgCs1WBlh4U2VpDEERzRQN@rajje.db.elephantsql.com:5432/jklsviyi';
const pool = new Pool({connectionString: myURI});



// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const queryStr = 'CREATE TABLE IF NOT EXISTS Tasks (id SERIAL PRIMARY KEY, item VARCHAR)'

const UserTable = 'CREATE TABLE IF NOT EXISTS Login (id SERIAL PRIMARY KEY, username VARCHAR, password VARCHAR)'


pool.query(queryStr, (err) => {
    console.log(err);
})


pool.query(UserTable, (err) => {
    console.log(err);
})






module.exports = {
    query:(text, params, callback) => {
        console.log('query is', text);
        return pool.query(text, params, callback);
    }}

