const { Pool } = require('pg');

const myURI = 'postgres://dbpohnzb:4UzLuCdsXh2MzrkoQzYPeKwNWvwRQwyH@salt.db.elephantsql.com:5432/dbpohnzb';

const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI
});

pool.query(`
  CREATE TABLE IF NOT EXISTS Tasks (
    "_id" SERIAL PRIMARY KEY,
    "item" VARCHAR,
    "created_at" TIMESTAMP DEFAULT NOW()
  )
`)
.then(res => {
  console.log('Created Task Table!')
})
.catch(err => console.log(err));


module.exports = pool;
