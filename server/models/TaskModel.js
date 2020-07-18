require('dotenv').config();
const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
// will be using the PG_URI I declared in .env instead
const myURI = '';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

/**
 * SQL to create table:
 *
 * CREATE TABLE Tasks(
 *	id serial PRIMARY KEY,
 *	item VARCHAR (50) NOT NULL,
 *	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 *
 */

const pool = new Pool({ connectionString: URI });

module.exports = pool; // <-- export your model
