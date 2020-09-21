const { Pool } = require('pg');
const myURI = 'postgres://lceqbqcy:A_dapAIAvXmqGquNWk_96shIBPV07muJ@lallah.db.elephantsql.com:5432/lceqbqcy';
const URI = process.env.PG_URI || myURI;

const pool = new Pool ({connectionString: URI});


module.exports = {
  query: function(text, params, cb) {
    return pool.query(text, params, cb);
  }
}
