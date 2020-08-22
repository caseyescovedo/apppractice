// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require("pg");
const myURI =
  "postgres://ajapdjot:0bVsTxi9lyOwe3wcWqsghaXIyvnx2D5N@lallah.db.elephantsql.com:5432/ajapdjot";

// UNCOMMENT THE LINE BELOW IF USING MONGO
const pool = new Pool({
  connectionSring: myURI,
});
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
}; // <-- export your model

// psql -d postgres://ajapdjot:0bVsTxi9lyOwe3wcWqsghaXIyvnx2D5N@lallah.db.elephantsql.com:5432/ajapdjot -f create.sql
