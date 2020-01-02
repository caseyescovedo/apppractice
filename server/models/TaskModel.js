const {Pool} = require('pg')
const myURI = 'postgres://hzqwsjpz:OxL89W8h3B_AHpwNCereM8TLpUZashTq@rajje.db.elephantsql.com:5432/hzqwsjpz';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
    connectionString: URI
  });


module.exports = pool; // <-- export your model
