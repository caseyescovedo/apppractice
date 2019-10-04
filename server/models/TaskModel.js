const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://apennadj:1eU0q9u_PhBygE-Ndqv35V_SuZiNcopF@salt.db.elephantsql.com:5432/apennadj';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
    connectionString: URI
});

pool.query(`
    CREATE TABLE IF NOT EXISTS "Task" (
    _id SERIAL PRIMARY KEY,
    item VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW())
`)
.catch((err) => {
    console.log(err);
})

module.exports = { pool }; // <-- export your model
