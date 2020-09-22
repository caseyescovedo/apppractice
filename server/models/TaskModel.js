const { Pool } = require('pg');

const myURI = 'postgres://acbyruag:ClbwLcPNeVQO9dcMveQiH01ZWfZJe6IN@lallah.db.elephantsql.com:5432/acbyruag';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({ connectionString: myURI });
module.exports = {
  query: function(text, params, func) {
    return pool.query(text, params, func);
  }
};