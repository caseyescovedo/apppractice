const { Pool } = require('pg');
//removed myURI
const myURI = '';

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