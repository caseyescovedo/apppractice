require('dotenv').config()
const { Pool } = require('pg');

const myURI = 'postgres://shuakcnt:0Rw05LJ0wJhyyyH1QKd2Rn18B-Io17dk@lallah.db.elephantsql.com:5432/shuakcnt';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
})

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}; // <-- export your model
