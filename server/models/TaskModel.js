const { Pool } = require('pg')
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://hzknlkzk:R5dMyuB64bY3qgy9aeWUOSm95IFJV7zI@rajje.db.elephantsql.com:5432/hzknlkzk';
const pool = new Pool({ connectionString: myURI })

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const creteTaskTable = 'CREATE TABLE IF NOT EXISTS task (id SERIAL PRIMARY KEY, item VARCHAR, created_at DATE DEFAULT CURRENT_DATE)'

pool.query(creteTaskTable, (err) => {
  if (err) console.log("Create task table err ", err)
})


module.exports = {
  query: (text, params, callback) => {
    console.log('Query ', text)
    return pool.query(text, params, callback);
  }
}; // <-- export your model
