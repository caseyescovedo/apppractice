// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://gkdkscwo:OEIF6xvG7T5duXS_7GlrCdGOLZt6lDsK@rajje.db.elephantsql.com:5432/gkdkscwo';


// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: myURI,
});

// an object with access to query the db throughout the application
const query = {

  query: (text) => {
    return pool.query(text);
  },

};

module.exports = query; // <-- export your model
