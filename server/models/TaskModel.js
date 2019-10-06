// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const pg = require('pg');

const myURI = 'postgres://tkwyqcpg:6vGhJwOIekQSEPFlDDoLMJ-FoRE6rU2z@salt.db.elephantsql.com:5432/tkwyqcpg';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const db = {};

pg.connect(uri, (err, db_) => {
    if (err) throw new Error(err);
    db.conn = db_;
  });


module.exports = db; // <-- export your model
