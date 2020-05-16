const { Pool } = require('pg');

const myURI = 'postgres://wsasxqww:sRe35p4avGCQ-kmp-RcZuDRlGbSxZ2iH@raja.db.elephantsql.com:5432/wsasxqww';

const URI = process.env.PG_URI || myURI;

// open pool
const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
