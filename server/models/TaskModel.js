// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const myURI =
  'postgres://vbsjjoei:SUTEfxTFR_lRdWzU7SGkDBx4cdzcqmWP@lallah.db.elephantsql.com:5432/vbsjjoei';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

//UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
}; // <-- export your model

//THIS IS THE QUERY I USED TO MAKE MY TABLE:
//create table task (itemid serial primary key, item varchar not null, created_at time not null default current_timestamp);
