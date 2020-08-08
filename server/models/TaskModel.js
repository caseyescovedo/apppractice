const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://zidyryzl:gp_zDpswq2vE75b7UBFan0DLPyk11CZv@rajje.db.elephantsql.com:5432/zidyryzl';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const db = new Pool({
  connectionString: URI,
});

const createTableQuery = `CREATE TABLE Tasks (
  id SERIAL PRIMARY KEY,
  item VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

// db.query(createTableQuery);

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed Query => ', text);
    return db.query(text, params, callback);
  }
};
