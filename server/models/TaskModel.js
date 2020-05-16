// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
//const myURI =
// ;

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
//const URI = process.env.PG_URI || myURI;

//module.exports = null; // <-- export your model

///coundnt perform query so replaced with usual syntax to try to find error

const { Pool } = require("pg");

const PG_URI =
  "postgres://lgnfoope:ymQmhR_ZZrVeg0lTa9AUZHBQyZXv-_IC@isilo.db.elephantsql.com:5432/lgnfoope";

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("querying: ", text);
    return pool.query(text, params, callback);
  },
};
