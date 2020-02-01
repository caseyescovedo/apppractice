const {Pool} = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '	postgres://weynyjiw:k4otQNeHrwLvUkQvEokPSeEQN9s9w57k@rajje.db.elephantsql.com:5432/weynyjiw';
const pool = new Pool({connectionString : myURI});
// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;
const queryString = 'CREATE TABLE IF NOT EXISTS TASK (id SERIAL PRIMARY KEY, item VARCHAR, created_at VARCHAR)';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

pool.query(queryString, (err) => {
    if(err) console.log(err);
})





module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
} // <-- export your model
