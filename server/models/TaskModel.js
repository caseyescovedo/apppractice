// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require ('pg');
const myURI = 'postgres://tbvjlird:zuiFRZ6HlrR1q_GU4oziV5KWnvAGVber@salt.db.elephantsql.com:5432/tbvjlird';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;
const pool = new Pool({
  connectionString : URI
})

module.exports = pool; // <-- export your model
