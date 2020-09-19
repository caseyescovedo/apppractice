const {Pool} = require('pg');


const myURI = 'postgres://ifxrwxwq:UBw4wXqsEp6wl6FPwScUEjcv04arFGMa@lallah.db.elephantsql.com:5432/ifxrwxwq';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({connectionString: URI});

module.exports = {
  query: (queryString, values, callback) => {
    return pool.query(queryString, values, callback);
  }
}