// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  "postgres://kiggmsfb:trzqrhUWZ-8YQquyMU_2eswDSuV8S6jg@lallah.db.elephantsql.com:5432/kiggmsfb";

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;
const { Pool } = require("pg");
const pool = new Pool({ connectionString: URI });

module.exports = {
  query: function (text, params, callback) {
    return pool.query(text, params, callback);
  },
}; // <-- export your model

//CREATE TABLE todo (_id SERIAL PRIMARY KEY, item VARCHAR(200), created_at TIMESTAMP);

//insert current time with CURRENT_TIMESTAMP
