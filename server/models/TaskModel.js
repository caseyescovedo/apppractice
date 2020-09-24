// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require("pg");

const myURI =
  "postgres://odccujcr:SHgpIOpnHM13zIlRMXfZkUCBv5t--39Z@lallah.db.elephantsql.com:5432/odccujcr";


// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({ connectionString: myURI });


module.exports = {
  query: function (text, params, cb) {
    return pool.query(text, params, cb);
  },
}; // <-- export your model
