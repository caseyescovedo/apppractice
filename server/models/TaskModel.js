// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg')
const myURI = 'postgres://uhkhfswr:Fl5gS8_wOVS3u417ZYlmxi8ni3O4dVXP@lallah.db.elephantsql.com:5432/uhkhfswr';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
    connectionString: myURI
});

const createTable = `CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    item VARCHAR,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
)`;

const usersTable = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR
)`;

pool.query(usersTable, err => {
    if(err) console.log('err in usersTable creation', err);
});


pool.query(createTable, err => {
    if(err) console.log('err in create table', err);
});

pool.on('connect', () => {
    console.log('connected to DB!')
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query is: ', text)
        return pool.query(text, params, callback)
    },
    
}; // <-- export your model
