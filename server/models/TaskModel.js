// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://hlxlcxjs:k-_SNnIVm_kz6wWnxcn5TbCmBVEdwYYp@salt.db.elephantsql.com:5432/hlxlcxjs';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: URI
});

const queryString = `CREATE TABLE IF NOT EXISTS Tasks (
  id SERIAL PRIMARY KEY, 
  item VARCHAR, 
  created_at TIME WITH TIME ZONE DEFAULT NOW())`

pool.query(queryString)
  // .then(res => res.json())
  .then(data => console.log('successfully created table'))
  .catch(e => console.error('unsuccessful table created', e))


module.exports = pool; // <-- export your model
