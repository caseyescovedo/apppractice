const { Pool } = require('pg');
const myURI = 'postgres://riepgovf:Xkl-oJ1PvI4Z6LzFKW_KVx0_twhObpBd@lallah.db.elephantsql.com:5432/riepgovf';

const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};