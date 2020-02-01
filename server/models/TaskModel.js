// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  "postgres://yycyfttc:SdS3vRDl77d-MkgFGDhCu46V1xCUx8BS@rajje.db.elephantsql.com:5432/yycyfttc";
const { Pool, Client } = require("pg");
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;
//Connecting to the database
const pool = new Pool({
  connectionString: myURI
});
//Create the table if it hasnt been created already
const createTable =
  "CREATE TABLE IF NOT EXISTS task(id SERIAL PRIMARY KEY,item varchar NOT NULL,created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);";
console.log("Creating a table");
pool.query(createTable, (err, data) => {
  if (err) {
    console.log("Couldnt create Table");
  }
});

module.exports = {
  query: function(text, values, callback) {
    console.log("this is your query   ", text);
    pool.query(text, values, callback);
  }
}; // <-- export your model
