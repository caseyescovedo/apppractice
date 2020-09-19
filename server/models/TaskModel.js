// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const myURI =
  'postgres://qcvbyalb:0eRlu_5MuNMSukmZCwo-CB_fOZrhW-WB@lallah.db.elephantsql.com:5432/qcvbyalb';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: myURI,
});

/*
https://node-postgres.com/guides/project-structure
https://sp.postgresqltutorial.com/wp-content/uploads/2018/03/PostgreSQL-Cheat-Sheet.pdf
*/

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}; // <-- export your model

// CREATE TABLE Tasks (_id SERIAL PRIMARY KEY, item VARCHAR(200) NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'PDT'))

//INSERT INTO Tasks (item) VALUES ('test tests')

//SELECT * from Tasks
