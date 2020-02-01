// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://vqvtxmfg:zX1oyBSSiJxj5PHYkt0FrRQhQo8KHjZi@rajje.db.elephantsql.com:5432/vqvtxmfg';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// create pool for batch queries
const { Pool } = require('pg');
const pool = new Pool ({ connectionString: myURI });

// postgres command to create new table
const queryString = 'CREATE TABLE IF NOT EXISTS task (id SERIAL PRIMARY KEY, item VARCHAR , created_at TIMESTAMP NOT NULL)';

module.exports = TaskModel; // <-- export your model
