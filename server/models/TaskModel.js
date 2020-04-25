const {Pool} = require('pg')

const myURI = 'postgres://hquocysx:oGQ5UfUnX4iSc-rf3ONcCH6khSWEoVJU@drona.db.elephantsql.com:5432/hquocysx';
 const URI = process.env.PG_URI || myURI;

const pool = new Pool({
    connectionString: URI
})

// since usuing postgres as opposed to mongo db I created new table following directions in the read me in elephant sql GUI as opposed to usuing  schema in the model 

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };
